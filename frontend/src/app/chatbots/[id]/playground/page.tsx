"use client"
import Chats from "@/components/Chats";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    sender: "bot",
    text: "Hello! How can I help you today?",
    timestamp: 1728388646584,
  }]);
  const handleSendMessage = async (message: string) => {
    const toastId = toast.loading("Sending message...");
    try {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "user",
          text: message,
          timestamp: Date.now(),
        },
      ]);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/query`);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: JSON.stringify(res),
          timestamp: Date.now(),
        },
      ]);
      toast.update(toastId, {
        render: "Message sent!",
        type: "success",
        isLoading: false,
        autoClose: 400,
      });
    }
    catch(e:any){
      toast.update(toastId, {
        render: JSON.stringify(e),
        type: "error",
        isLoading: false,
        autoClose: 400,
      });
    }
  }
  return (
    <div
      className="w-full max-w-5xl mx-auto border border-gray-200 rounded-lg p-10 flex flex-col items-center justify-center md:h-full h-full max-h-[80%]"
      style={{
        backgroundColor: "#fafafa",
        opacity: 1,
        backgroundImage: "radial-gradient(#001aff 0.5px, #fafafa 0.5px)",
        backgroundSize: "10px 10px",
      }}
    >
      <main className="group relative flex h-full flex-col bg-white rounded-md overflow-hidden flex-1 basis-full overflow-y-hidden scroll-smooth shadow-inner max-w-lg w-full">
          <Chats messages={messages} chatName={`Ray's Chat Bot`} handleSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}
