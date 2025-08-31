import {createContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import USER_ROLES from "../types/userRoles";

const AnnouncementContext = createContext({
    announcements: [],
});

const AnnouncementProvider = ({children}) => {
    const [announcements, setAnnouncements] = useState(null);
    const {accessToken, loading, user} = useAuth();

    useEffect(() => {

        if (!accessToken) return;

        if (user.role == USER_ROLES.ADMIN) return;

        fetch(import.meta.env.VITE_API_URL + "/api/announcements/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => setAnnouncements(data.announcements))
            .catch((err) => console.error(err));
    }, [accessToken || loading]);
    return (
        <AnnouncementContext.Provider value={{announcements, setAnnouncements}}>
            {children}
        </AnnouncementContext.Provider>
    );
};
export {AnnouncementContext};
export default AnnouncementProvider;