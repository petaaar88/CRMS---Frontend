import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const {handleLogout} = useAuth();
    const navigate = useNavigate();

    const handleClick = async () => {
        const success = await handleLogout();

        if (success)
            navigate('/login', {replace: true});

    }
    return (
        <button className="block mx-auto cursor-pointer my-2 text-red-500 dark:text-red-300" variant="text"
                color="error" onClick={handleClick}><span className="hover:underline">Logout</span></button>
    )
}

export default LogoutButton