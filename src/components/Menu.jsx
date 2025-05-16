import MenuButton from './MenuButton'

const Menu = () => {
  return (
    <nav style={{background:"#252E2D", width:"300px"}} className="h-screen">
        <h3 className="text-5xl text-white font-semibold text-center py-7">CRMS</h3>
      <ul>
        <li><MenuButton text="Home" /></li>
        <li><MenuButton text="Reports" /></li>
        <li><MenuButton text="Settings" /></li>
        <li><MenuButton text="Logout" /></li>
      </ul>
    </nav>
  )
}

export default Menu
