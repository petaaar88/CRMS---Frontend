import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const MenuButton = ({text}) => {
    const [isActive, setIsActive] = useState(false);

  return (
    
    <button className='block w-full py-3 text-lg text-white cursor-pointer hover:bg-gray-700'>{text}</button>
  )
}

export default MenuButton
