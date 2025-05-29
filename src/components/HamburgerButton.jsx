import { useState } from "react";
import DarkHamburgerIcon from "../assets/hamburger-menu-dark.png";
import DarkCloseIcon from "../assets/close-dark.png";

const HamburgerButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () =>{
        setIsOpen(!isOpen);
    }

  return (
    <button onClick={handleClick} className="me-4"><img src={!isOpen?DarkHamburgerIcon:DarkCloseIcon} width={"50px"}/></button>
  )
}

export default HamburgerButton