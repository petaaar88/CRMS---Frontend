import { useState, useRef, useContext } from "react"
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnnouncemensContainer from "./AnnouncemensContainer"
import { AnnoucementContext } from "../contexts/AnnoucementContext";

const UserBadge = () => {

  const [open, setOpen] = useState(false);
  const divRef = useRef(null);

  const {annoucements} =useContext(AnnoucementContext);

  const handleClick = () => setOpen(prev => !prev);
  const handleClose = () => setOpen(false);


  return (
    <>
      <div ref={divRef} className=' flex items-center gap-x-4 md:shadow-lg hover:bg-gray-100 md:bg-light-gray cursor-pointer dark:bg-dark-green md:dark:bg-deep-green hover:dark:bg-dark-green px-5 py-3 rounded-lg'  onClick={handleClick}>
          <img src="https://api.dicebear.com/9.x/initials/svg?radius=50&seed=User" style={{width:"40px",height:"40px"}} alt="" />
          <div>
              <p className='text-black dark:text-white font-semibold '>Username</p>
              <p className='text-black dark:text-white font-light text-sm'>Role</p>    
          </div>
          <Badge color="error" variant="dot" invisible={annoucements ? !annoucements.some(annoucement => annoucement.seen == false): true}>
            <NotificationsIcon />
          </Badge>
      </div>
      <AnnouncemensContainer anchorEl={divRef.current} open={open} onClose={handleClose}/>
    </>
  )
}


export default UserBadge