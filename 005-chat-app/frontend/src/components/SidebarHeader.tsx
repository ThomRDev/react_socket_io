import { useAuth } from "../hooks"

export const SidebarHeader = () => {
  const { auth,logout } = useAuth()
  return (
    <header className="sidebar__header">
      <h3>{ auth.name }</h3>
      <button onClick={logout} >Salir</button>
    </header>
  )
}
