import { ChangeEvent, FormEvent, useState } from "react"
import { useAuth, useAuthSocket, useChat } from "../hooks"

export const SendMessage = () => {
  const [message,setMessage] = useState('')
  const { socket } = useAuthSocket()
  const { auth } = useAuth()
  const { chatState } = useChat()

  const onInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setMessage(event.target.value)
  }

  const onSubmit = (event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    if(message.length <=0) return;
    socket?.emit('private-message',{
      from : auth.uid,
      to: chatState.selectedChat,
      message
    })
    setMessage('')
  }

  return (
    <form className='send-container' onSubmit={onSubmit}>
      <input placeholder='Mensaje ...' name="message" value={message} onChange={onInputChange} autoComplete="off" autoFocus />
      <button type='submit'>Enviar</button>
    </form>
  )
}
