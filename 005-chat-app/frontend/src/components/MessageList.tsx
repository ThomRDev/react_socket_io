import { useEffect, useLayoutEffect } from "react"
import { scrollToBottom, scrollToBottomAnimated } from "../helpers/scrollToBottom"
import { useChat } from "../hooks/useChat"
import { Message } from "./Message"

export const MessageList = () => {
  const { chatState:{ messages } } = useChat()
  
  useEffect(()=>{
    scrollToBottomAnimated('messages')
  },[messages])
 
  useLayoutEffect(()=>{
    scrollToBottom('messages')
  },[])
  

  return (
    <ul className='messages' id="messages">
      {
        messages.map(msg =>(
          <Message  key={msg._id} msg={msg} />
        ))
      }
    </ul>
  )
}
