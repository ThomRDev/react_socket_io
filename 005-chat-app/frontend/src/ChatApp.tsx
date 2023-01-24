import { AuthProvider, SocketProvider } from './context'
import { ChatProvider } from './context/ChatContext'
import { AppRouter } from './router/AppRouter'

function ChatApp() {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}

export default ChatApp
