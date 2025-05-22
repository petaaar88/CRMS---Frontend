import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/login", { replace: true });
    }
  }, [accessToken, loading, navigate]);

  if (loading) {
    return <p>Neki tekst</p>; 
  }

  return accessToken ? children : <p>Neki tekst</p>;
};

export default ProtectedRoute;