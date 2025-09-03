import {NavLink} from 'react-router-dom'
import ThemeButton from './ThemeButton'
import {ThemeContext} from '../contexts/ThemeContext'
import {useContext, useEffect, useRef, useState} from 'react'
import useBreakpoints from '../hooks/useBreakpoints'

import DarkHamburgerMenuIcon from "../assets/hamburger-menu-dark.png";
import LightHamburgerMenuIcon from "../assets/hamburger-menu-light.png";
import DarkCloseIcon from "../assets/close-dark.png";
import LightCloseIcon from "../assets/close-light.png";
import UserBadge from './UserBadge'
import {useAuth} from '../contexts/AuthContext'
import USER_ROLES from '../types/userRoles'

const Menu = () => {

    const {isMdBreakpoint, isLgBreakpoint} = useBreakpoints();
    const [isHamburgerMenuClicked, setIsHamburgerMenuClicked] = useState(false);
    const {user} = useAuth()

    const handleClick = () => {
        setIsHamburgerMenuClicked(!isHamburgerMenuClicked);
    }

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsHamburgerMenuClicked(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const MENU_BUTTON_ACTIVE_COLOR = {
        light: "#50BF3D",
        dark: "#5CF8AA"
    }
    const {theme} = useContext(ThemeContext);
    const navStyle = ({isActive}) => {
        return {
            color: isActive ? MENU_BUTTON_ACTIVE_COLOR[theme] : (theme === "dark" ? "#fff" : "#000"),
            borderRight: !isMdBreakpoint ? "" : (isActive ? "8px solid " + MENU_BUTTON_ACTIVE_COLOR[theme] + "" : "")
        }
    }

    return (
        <>

            {isHamburgerMenuClicked && !isMdBreakpoint ?
                <div className="bg-black/50 w-full h-full fixed z-11">
                </div>

                : null
            }

            <nav ref={menuRef} style={{width: isLgBreakpoint ? "300px" : isMdBreakpoint ? "200px" : "100%"}}
                 className={"z-11 bg-white dark:bg-dark-green shadow-xl fixed " + (isMdBreakpoint ? " h-screen  " : "")}>
                <div className='h-full flex flex-col justify-between relative'>

                    <div>
                        {
                            isMdBreakpoint ?
                                <h3 className="text-5xl text-black dark:text-white font-semibold text-center py-7">CRMS</h3>
                                :
                                <div className='flex justify-between me-5'>
                                    <UserBadge/>
                                    <button onClick={handleClick} className="my-4 bg-transparent border-0 outline-0">
                                        <img
                                            src={isHamburgerMenuClicked ? theme === "dark" ? DarkCloseIcon : LightCloseIcon : theme === "dark" ? DarkHamburgerMenuIcon : LightHamburgerMenuIcon}
                                            width="38px"/>
                                    </button>
                                </div>
                        }

                        <div>
                            {isHamburgerMenuClicked && !isMdBreakpoint || isMdBreakpoint ?
                                <ul onClick={handleClick}>
                                    <li><NavLink style={navStyle}
                                                 className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'}
                                                 to={"/home"}>Home</NavLink></li>
                                    <li><NavLink style={navStyle}
                                                 className={'block w-full text-center py-3 px-2 whitespace-pre-line text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'}
                                                 to={"/partners-and-reports"}>Partners And Reports</NavLink></li>
                                    <li><NavLink style={navStyle}
                                                 className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'}
                                                 to={"/plans"}>Plans</NavLink></li>
                                    {user?.role === USER_ROLES.ADMIN ?
                                        <li><NavLink style={navStyle}
                                                     className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'}
                                                     to={"/manage"}>Manage</NavLink></li>
                                        : null
                                    }
                                    {user?.role === USER_ROLES.ADMIN ?
                                        <li><NavLink style={navStyle}
                                                     className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'}
                                                     to={"/announcements"}>Announcements</NavLink></li>
                                        : null
                                    }
                                    {user?.role === USER_ROLES.USER ?
                                        <li><NavLink style={navStyle}
                                                     className={'block w-full text-center py-3 text-lg text-black dark:text-white cursor-pointer hover:bg-light-gray text-black-500 dark:hover:bg-forest-green'}
                                                     to={"/assignments"}>Assignments</NavLink></li>
                                        : null
                                    }
                                    {!isMdBreakpoint ?
                                        <li className='flex justify-center mt-4 mb-7'><ThemeButton/></li> : null}
                                </ul>
                                :
                                null
                            }
                        </div>

                    </div>
                    {
                        isMdBreakpoint ?
                            <div className='flex justify-around mb-4'>
                                <ThemeButton/>
                            </div>
                            : null
                    }

                </div>
            </nav>
        </>
    )
}

export default Menu
