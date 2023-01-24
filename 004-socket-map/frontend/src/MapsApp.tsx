import { SocketProvider } from "./context/SocketContext"
import { MapPage } from "./pages/MapPage"
import { MapPageUseRef } from "./pages/MapPage-useRef"

export const MapsApp = () => {
  return (
    <SocketProvider>
      <MapPage />
    </SocketProvider>
    // <MapPageUseRef />
  )
}
