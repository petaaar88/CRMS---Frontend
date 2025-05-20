import { NavLink } from 'react-router-dom'
import MenuButton from './MenuButton'
import ThemeButton from './ThemeButton'

const Menu = () => {

  const navStyle = ({isActive}) =>{
      return {
        color: isActive ?"blue" : "white",
        borderRight: isActive ? "8px solid blue " : ""
      }
  }

  return (

    <nav style={{background:"#252E2D", width:"300px"}} className="h-screen fixed">
        <div className='h-full flex flex-col justify-between'>
          <div>
            <h3 className="text-5xl text-white font-semibold text-center py-7">CRMS</h3>
            <ul>
              <li><NavLink style={navStyle} className={'block w-full text-center py-3 text-lg text-white cursor-pointer hover:bg-gray-700'} to={"/home"}>Home</NavLink></li>
              <li><NavLink style={navStyle} className={'block w-full text-center py-3 text-lg text-white cursor-pointer hover:bg-gray-700'} to={"/reports"}>Reports</NavLink></li>
              <li><NavLink style={navStyle} className={'block w-full text-center py-3 text-lg text-white cursor-pointer hover:bg-gray-700'} to={"/settings"}>Settings</NavLink></li>
            </ul>
          </div>

          <div className='flex justify-around mb-4'>
            <ThemeButton/>
          </div>

        </div>
    </nav>
  )
}

export default Menu
