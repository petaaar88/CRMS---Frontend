import { useState, useRef, useContext } from "react"
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnnouncemensContainer from "./AnnouncemensContainer"
import { AnnoucementContext } from "../contexts/AnnoucementContext";
import USER_ROLES from "../types/userRoles";
import { useAuth } from "../contexts/AuthContext";
import UserInfoContext from "../contexts/UserInfoContext.jsx";
import { CircularProgress } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";

const UserBadge = () => {

    const [open, setOpen] = useState(false);
    const divRef = useRef(null);
    const{user} = useAuth();
    const {userInfo} = useContext(UserInfoContext);
    const { theme } = useContext(ThemeContext);

    const {annoucements} =useContext(AnnoucementContext);

    const handleClick = () => setOpen(prev => !prev);
    const handleClose = () => setOpen(false);


    return (
        <>
            <div ref={divRef} className=' flex items-center gap-x-4 md:shadow-lg hover:bg-gray-100 md:bg-light-gray cursor-pointer dark:bg-dark-green md:dark:bg-deep-green hover:dark:bg-dark-green px-5 py-3 rounded-lg'  onClick={handleClick}>
                {userInfo ?
                    <>
                        <img src={userInfo.iconUrl} style={{width:"40px",height:"40px"}} className="rounded-4xl border-green-400 border-2" alt="" />
                        <div>
                            <p className='text-black dark:text-white font-semibold '>{userInfo.firstAndLastName}</p>
                            <p className='text-black dark:text-white font-light text-sm'>{(userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1))}</p>
                        </div>
                        {user.role == USER_ROLES.USER ?
                            <Badge color="error" variant="dot" invisible={annoucements ? !annoucements.some(annoucement => annoucement.seen == false): true}>
                                <NotificationsIcon />
                            </Badge>
                            :null}
                    </>
                    :<div className="w-45 flex justify-center"><CircularProgress sx={{
                        color:
                            theme === "dark"
                                ? "var(--color-menu-button-dark)"
                                : "var(--color-button-light-green)",
                    }}/></div>}
            </div>
            {userInfo ?<AnnouncemensContainer anchorEl={divRef.current} open={open} onClose={handleClose}/>:null}
        </>
    )
}


export default UserBadge