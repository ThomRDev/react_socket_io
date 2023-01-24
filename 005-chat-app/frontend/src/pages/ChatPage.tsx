import { ChatView } from '../components/ChatView'
import { Sidebar } from '../components/Sidebar'

export const ChatPage = () => {
  return (
    <div className="chat-container">
      <Sidebar />
      <ChatView />
    </div>
  )
}
