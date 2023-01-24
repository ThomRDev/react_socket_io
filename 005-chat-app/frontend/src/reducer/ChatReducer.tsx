export enum ChatActionTypes {
  LOAD_MESSAGES = "[chat] load messages",
  NEW_MESSAGE = "[chat] new message",
  SELECT_CHAT = "[chat] select chat",
  LOAD_USERS = "[chat] load users",
  FETCHING_MESSAGES = "[chat] fetching messages",
  CLEAR_DATA = "[chat] clear data"
}

export interface Message{
  to : string,
  from : string,
  message : string
  _id : string,
  createdAt:string
}

export interface User{
  name:string,
  email:string,
  online:boolean,
  uid:string
}
export interface ChatState {
  // uid del cliente conectado
  uid: string | null,

  // chat seleccionado
  selectedChat: string | null,

  // tod0s los usuarios conectados o no conectados
  users: User[]

  // mensajes del chat seleccionado
  messages: Message[],

  fetching_messages : boolean
}

export type ChatActions =
| { type: ChatActionTypes.LOAD_MESSAGES,payload:Message[]  }
| { type: ChatActionTypes.NEW_MESSAGE,payload:Message  }
| { type: ChatActionTypes.SELECT_CHAT,payload:string  }
| { type: ChatActionTypes.LOAD_USERS,payload:User[]  }
| { type: ChatActionTypes.FETCHING_MESSAGES,payload:boolean  }
| { type: ChatActionTypes.CLEAR_DATA  }

export const chatReducer = (state:ChatState,action:ChatActions):ChatState => {
  switch(action.type){
    case ChatActionTypes.LOAD_MESSAGES:
      return {
        ...state,
        messages : action.payload
      }
    case ChatActionTypes.LOAD_USERS:
      return {
        ...state,
        users : action.payload
      }
    case ChatActionTypes.NEW_MESSAGE:
      if(state.selectedChat === action.payload.from || state.selectedChat === action.payload.to){
        return {
          ...state,
          messages : [...state.messages, action.payload]
        }
      }
      return state
    case ChatActionTypes.SELECT_CHAT:
      if(state.selectedChat === action.payload) return state
      return {
        ...state,
        selectedChat : action.payload,
        messages : []
      }
    case ChatActionTypes.FETCHING_MESSAGES:
      return {
        ...state,
        fetching_messages : action.payload
      }
    case ChatActionTypes.CLEAR_DATA:
      return Chat_initial_state
    default:
      return state
  }
}

export const Chat_initial_state:ChatState = {
  messages:[],
  selectedChat:null,
  uid:null,
  users:[],
  fetching_messages:false
}