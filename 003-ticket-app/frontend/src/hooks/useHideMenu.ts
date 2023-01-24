import { UIContext } from './../context/UIContext';
import { useContext, useEffect } from "react"

export const useHideMenu = (hide:boolean) => {
  
  const { showMenu,hideMenu } = useContext(UIContext)

  useEffect(()=>{
    if(hide){
      hideMenu()
    }else{
      showMenu()
    }
  },[hide,hideMenu,showMenu])
}
