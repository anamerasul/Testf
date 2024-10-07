import React, { PropsWithChildren } from 'react'

interface PropsType {
  className?: string
  id?: string
}

function Container(props: PropsWithChildren<PropsType>) {
  return (
    <div id={props.id} className={'mx-auto max-w-7xl px-4 py-6 ' + props.className}>
      {props.children}
    </div>
  )
}

export default Container