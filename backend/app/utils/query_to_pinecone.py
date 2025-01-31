import torch
import os
from pinecone import Pinecone
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModel    
load_dotenv()

def query_pinecone(tokenizer: AutoTokenizer, model: 
                    AutoModel, query: str, index_name:str, valid_namespaces: list, 
                top_k: int):
    
    input_ids = tokenizer(query, return_tensors="pt")["input_ids"]
    with torch.no_grad():
        embeddings = model(input_ids)["last_hidden_state"].mean(dim=1)

    query_embeddings=embeddings.numpy()[0].tolist()

    pinecone_api_key=os.getenv('PINECONE_API_KEY')
    pc = Pinecone(api_key=pinecone_api_key)
    index=pc.Index(index_name)

    answer=[]
    for namespace_name in valid_namespaces:
        res=index.query(
            vector=query_embeddings, 
            top_k=top_k, 
            namespace=namespace_name
        )

        final=[]
        for i in res["matches"]:
            final.append(i["id"])
        answer.append(final)
    
    return str(answer)