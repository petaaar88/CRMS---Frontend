import { Outlet } from "react-router-dom"
import Menu from "../components/Menu"

const MainLayout = () => {
  return (
    <div className="flex h-100">
        <Menu />
        <div style={{width:"100%",marginLeft:"300px"}} className="p-7">
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout