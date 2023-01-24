import { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from "react";
import { ChatActionTypes, chatReducer, ChatState, Chat_initial_state, Message,User } from "../reducer/ChatReducer";

interface ChatProviderProps {
  children ?: ReactNode
}

interface ChatContextProps {
  chatState:ChatState,
  selectChat:(uid:string) => void,
  loadMessages:(messages:Message[]) => void,
  loadUsers:(users:User[]) => void,
  newMessage:(message:Message) => void,
  fetchingMessages : (fetching:boolean) => void,
  clearData : () => void
}

export const ChatContext = createContext<ChatContextProps>({} as ChatContextProps)

export const ChatProvider = ({children}:ChatProviderProps) => {
  const [ chatState,dispatch ] = useReducer(chatReducer,Chat_initial_state)

  const selectChat = useCallback((uid:string)=>{
    dispatch({
      type:ChatActionTypes.SELECT_CHAT,
      payload:uid
    })
  },[])
  
  const loadMessages = useCallback((messages:Message[])=>{
    dispatch({
      type:ChatActionTypes.LOAD_MESSAGES,
      payload:messages
    })
  },[])

  const loadUsers = useCallback((users:User[])=>{
    dispatch({
      type:ChatActionTypes.LOAD_USERS,
      payload:users
    })
  },[])

  const newMessage = useCallback((message:Message)=>{
    dispatch({
      type:ChatActionTypes.NEW_MESSAGE,
      payload:message
    })
  },[])
  
  const fetchingMessages = useCallback((fetching:boolean)=>{
    dispatch({
      type:ChatActionTypes.FETCHING_MESSAGES,
      payload:fetching
    })
  },[])

  const clearData = useCallback(()=>{
    dispatch({
      type:ChatActionTypes.CLEAR_DATA,
    })
  },[]) 

  const value = useMemo(()=>({
    chatState,
    selectChat,
    loadMessages,
    loadUsers,
    newMessage,
    fetchingMessages,
    clearData
  }),[chatState,selectChat,loadMessages,loadUsers,fetchingMessages,clearData])

  return <ChatContext.Provider value={value}>
    { children }
  </ChatContext.Provider>
}