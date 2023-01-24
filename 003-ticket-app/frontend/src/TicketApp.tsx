import { BrowserRouter } from "react-router-dom"
import { SocketProvider } from "./context/SocketContext"
import { UIProvider } from "./context/UIContext"
import { RouterPage } from "./pages/RouterPage"

export const TicketApp = () => {
  return (
    <>
      <BrowserRouter>
        <SocketProvider>
          <UIProvider>
            <RouterPage />
          </UIProvider>
        </SocketProvider>
      </BrowserRouter>
    </>
  )
}
