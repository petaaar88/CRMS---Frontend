import {createContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";

const UserInfoContext = createContext(null);

const UserInfoProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState(null);
    const {accessToken} = useAuth();

    useEffect(() => {
        if (!accessToken) return;

        fetch(import.meta.env.VITE_API_URL + '/api/users/summary', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => setUserInfo(data.userInfo))
            .catch(error => console.error(error));


    }, [accessToken])
    return (<UserInfoContext.Provider value={{userInfo}}>
        {children}
    </UserInfoContext.Provider>)

}
export {UserInfoProvider};
export default UserInfoContext;