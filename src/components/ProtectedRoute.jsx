import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/login", { replace: true });
    }
  }, [accessToken, loading, navigate]);

  if (loading) {
    return <LoadingPage/>; 
  }

  return accessToken ? children : <LoadingPage/>;
};

export default ProtectedRoute;