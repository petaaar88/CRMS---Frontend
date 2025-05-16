import { Outlet } from "react-router-dom"
import Menu from "../components/Menu"

const MainLayout = () => {
  return (
    <div className="flex">
        <Menu />
        <div style={{width:"100%"}} className="p-7">
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout