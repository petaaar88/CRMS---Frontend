import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
   
    refreshToken().finally(() => setLoading(false));
  }, []);

  const handleLogin = async (credentials) => {
    setIsError(false);

    if (!credentials.username || !credentials.password) {
      setIsError(true);
      return false;
    }

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
      setAccessToken(data.accessToken);
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
      setAccessToken(data.accessToken);

    } catch (error) {
      console.error("Refresh error:", error);
      setAccessToken(null);
    }
  };
  
  return (
    <AuthContext.Provider value={{ accessToken, isError, handleLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
