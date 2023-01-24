import { useAuth } from '../hooks'
import { useChat } from '../hooks/useChat'
import { SidebarChatItem } from './SidebarChatItem'
import { SidebarHeader } from './SidebarHeader'


export const Sidebar = () => {
  const { auth:{ uid } } = useAuth()
  const { chatState :{ users } } = useChat()

  return (
    <aside className="sidebar">
        <SidebarHeader />
        <ul className="users">
          {
            users
            .filter( user => user.uid !== uid )
            .map(user=> <SidebarChatItem user={user} key={user.uid} /> )
          }
          
        </ul>
      </aside>
  )
}
