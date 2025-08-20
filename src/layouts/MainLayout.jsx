import {Outlet} from "react-router-dom"
import Menu from "../components/Menu"
import useBreakpoints from "../hooks/useBreakpoints"

const MainLayout = () => {
    const {isMdBreakpoint, isLgBreakpoint} = useBreakpoints();

    return (
        <div className="flex md:flex-row flex-col h-full text-black dark:text-white">
            <Menu/>
            <div style={{width: "100%", marginLeft: isLgBreakpoint ? "300px" : isMdBreakpoint ? "200px" : "0px"}}
                 className="p-7 md:mt-0 mt-20">
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout