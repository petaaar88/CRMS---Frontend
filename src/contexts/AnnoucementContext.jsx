import {createContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import USER_ROLES from "../types/userRoles";

const AnnoucementContext = createContext({
    annoucements: [],
});

const AnnoucementProvider = ({children}) => {
    const [annoucements, setAnnoucements] = useState(null);
    const {accessToken, loading, user} = useAuth();

    useEffect(() => {

        if (!accessToken) return;

        if (user.role == USER_ROLES.ADMIN) return;

        fetch(import.meta.env.VITE_API_URL + "/api/annoucements/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => setAnnoucements(data.annoucements))
            .catch((err) => console.error(err));
    }, [accessToken || loading]);
    return (
        <AnnoucementContext.Provider value={{annoucements, setAnnoucements}}>
            {children}
        </AnnoucementContext.Provider>
    );
};
export {AnnoucementContext};
export default AnnoucementProvider;