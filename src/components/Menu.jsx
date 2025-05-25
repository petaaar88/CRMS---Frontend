import { NavLink } from 'react-router-dom'
import ThemeButton from './ThemeButton'
import { ThemeContext } from '../contexts/ThemeContext'
import { useContext } from 'react'

const Menu = () => {

  const MENU_BUTTON_ACTIVE_COLOR = {
    light: "#50BF3D",
    dark: "#5CF8AA"
  }
  const{theme} = useContext(ThemeContext);
  const navStyle = ({isActive}) =>{
      return {
        color: isActive ? MENU_BUTTON_ACTIVE_COLOR[theme] : (theme === "dark" ? "#fff" : "#000"),
        borderRight: isActive ? "8px solid " + MENU_BUTTON_ACTIVE_COLOR[theme] + "" : ""
      }
  }

  return (
    <nav style={{width:"300px"}} className="h-screen fixed bg-white dark:bg-dark-green shadow-xl">
        <div className='h-full flex flex-col justify-between'>
          <div>
            <h3 className="text-5xl text-black dark:text-white font-semibold text-center py-7">CRMS</h3>
            <ul>
              <li><NavLink style={navStyle} className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'} to={"/home"}>Home</NavLink></li>
              <li><NavLink style={navStyle} className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'} to={"/reports"}>Reports</NavLink></li>
              <li><NavLink style={navStyle} className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'} to={"/settings"}>Settings</NavLink></li>
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
