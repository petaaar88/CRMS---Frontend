import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext"

const AuthorizedRoute = ({children,authorizedRoles}) => {
    const {accessToken} = useAuth();
    const navigate = useNavigate();

    const decodetToken = jwtDecode(accessToken);
        
    useEffect(() => {
        if (!accessToken) {
            navigate("/login", { replace: true });
            return;
        }

        let decodedToken;
        try {
            decodedToken = jwtDecode(accessToken);
        } catch (error) {
        
            navigate("/login", { replace: true });
            return;
        }

        if (!authorizedRoles.includes(decodedToken.role)) 
            navigate("/reports", { replace: true });
        
        
    }, [decodetToken]); 

    return children;
}

export default AuthorizedRoute