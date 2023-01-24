import { useChat } from "../hooks/useChat"
import { AlertMessage } from "./AlertMessage"
import { ChatSelected } from "./ChatSelected"

export const ChatView = () => {
  const { chatState:{ selectedChat } } = useChat()
  return (
    <main className="chat-view">
      {
        selectedChat ? <ChatSelected /> : <AlertMessage /> 
      }
      </main>
  )
}
