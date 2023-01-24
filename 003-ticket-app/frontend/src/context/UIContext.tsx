import {createContext,ReactNode,useState} from 'react'

export interface UIContextProps {
  isHideMenu : boolean
  showMenu:()=>void
  hideMenu:()=> void
}

export const UIContext = createContext<UIContextProps>({} as UIContextProps)

interface UIProviderProps {
  children ?: ReactNode
}

export const UIProvider = ({ children }:UIProviderProps) => {
  const [isHideMenu, setIsHideMenu] = useState(false)
  
  const showMenu = () => setIsHideMenu(false)
  const hideMenu = () => setIsHideMenu(true)

  return (
    <UIContext.Provider value={{
      isHideMenu,
      showMenu,
      hideMenu
    }}>
      {
        children
      }
    </UIContext.Provider>
  )
}
