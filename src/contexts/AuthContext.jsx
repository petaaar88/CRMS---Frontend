import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {

    refreshToken().finally(() => setLoading(false));
  }, []);

  const handleLogin = async (credentials) => {
    setIsError(false);

    if (!credentials.username || !credentials.password) {
      setIsError(true);
      return false;
    }
    credentials.username = credentials.username.trim();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        setIsError(true);
        return false;
      }

      const data = await response.json();

      try {

        let decodedToken = jwtDecode(data.accessToken);

        setUser({id:decodedToken.id,role:decodedToken.role})
        setAccessToken(data.accessToken);
        setIsError(false);
        return false;

      } catch (error) {
        console.error("Error while decoding token")

      }

      return true;

    } catch (error) {
      console.error("Login error:", error);
      setIsError(true);
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/refresh`, {
        method: "POST",
        credentials: 'include',
      });

      if (!response.ok) {
        console.log("Refresh token failed!!!");
        setAccessToken(null);
        return;
      }

      const data = await response.json();

      try {

        let decodedToken = jwtDecode(data.accessToken);

        setUser({id:decodedToken.id,role:decodedToken.role})
        setAccessToken(data.accessToken);
        setIsError(false);
        return false;

      } catch (error) {
        console.error("Error while decoding token")

      }

    } catch (error) {
      console.error("Refresh error:", error);
      setAccessToken(null);
    }
  };

  const handleLogout = async() =>{

    try{
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/logout', {
        method: "POST",
        credentials: "include",
      });

      if(!response.ok)
        return false;

      setAccessToken(null);
      setUser(null);

      return true;
    }
    catch(error){
      return false;
    }


  }

  return (
      <AuthContext.Provider value={{ accessToken, isError, handleLogin, loading, user, handleLogout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
