import { useState } from "react"

const useAuth = () => {

    const [isError, setIsError] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    const handleLogin = async(credentials) =>{

        if(!credentials.username || !credentials.password){
            setIsError(true);
            return false; 
        }
        
        try{

            const request = new Request(import.meta.env.VITE_API_URL + "/api/login",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                credentials: 'include',
                body:JSON.stringify(credentials)});
                
                const response = await fetch(request);
                
                if(!response.ok){
                    setIsError(true);
                    return false;  
                }
                
                const data = await response.json();

                setAccessToken(data.accessToken);

                return true;  
        }
        catch(error){
            console.log(error);
            
        }
        
    }

  return {handleLogin, isError, accessToken}
}

export default useAuth