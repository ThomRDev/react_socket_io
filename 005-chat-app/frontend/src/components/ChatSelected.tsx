import { useChat } from '../hooks'
import { MessageList } from './MessageList'
import { SendMessage } from './SendMessage'
export const ChatSelected = () => {
  const { chatState:{ fetching_messages } } = useChat()
  return (
    <div className='chat-selected'>
      {
        fetching_messages ? <>
          <p>Loading ... </p>
        </> : <>
          <MessageList />
          <SendMessage />
        </> 
      }
    </div>
  )
}
