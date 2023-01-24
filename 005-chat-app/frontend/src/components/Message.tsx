import { formatDate } from '../helpers/formatDate'
import { useAuth } from '../hooks'
import { Message as Msg } from '../reducer/ChatReducer'
import img from './../assets/user-profile.png'
export const Message = ({ msg }:{ msg:Msg }) => {
  const { auth } = useAuth()
  const self = msg.from === auth.uid
  return (
    // message--self
    <li className={`message ${self ? 'message--self':''}`}>
      <div className='message-wrapper'>
        <div className="message__avatar">
          <img src={img} alt="" className='message__img' />
        </div>
        <div className="message__info">
          <p className="message__content">{ msg.message }</p>
          <p className="message__date">{ formatDate(msg.createdAt) }</p>
        </div>
      </div>
    </li>
  )
}
