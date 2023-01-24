
import { fetchWithToken } from '../helpers/fetch'
import { useChat } from '../hooks/useChat'
import { User } from '../reducer/ChatReducer'
import img from './../assets/user-profile.png'
export const SidebarChatItem = ({  user }:{ user:User }) => {
  const { chatState,selectChat,loadMessages,fetchingMessages } = useChat()

  const onClickSelectChat = async () => {
    fetchingMessages(true)
    selectChat(user.uid)
    const response = await fetchWithToken(`api/messages/${user.uid}`)
    loadMessages(response.messages)
    fetchingMessages(false)
  }

  return (
    <li className={`user ${user.uid === chatState.selectedChat ? 'user--selected':''}`}  onClick={onClickSelectChat} >
      <div className="user__avatar">
        <img src={img} alt="" className="user__img" />
      </div>
      <div className="user__description">
        <p className="user__name">{ user.name }</p>
        <p className={`user__status ${user.online ?'user__status--online':''}`}>{  user.online ? 'Online' : 'Offline' }</p>
      </div>
    </li>
  )
}