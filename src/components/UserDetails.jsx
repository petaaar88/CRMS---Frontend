import { useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";

const UserDetails = () => {
  const { fetchData, fetchedData, loading } = useFetch();
  const {theme} = useContext(ThemeContext);
  const { accessToken, user } = useAuth();

  useEffect(() => {
    fetchData(import.meta.env.VITE_API_URL + `/api/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, []);

  return (
    
    <div className="bg-white dark:bg-deep-green rounded-xl p-8 mx-4 md:m-0 shadow-lg">
       {loading ? 
       <div className="h-48 flex justify-center items-center">
            <CircularProgress
                sx={{
                    color:
                        theme === "dark"
                            ? "var(--color-menu-button-dark)"
                            : "var(--color-button-light-green)",
                }}
            />
        </div>:
        <div>
            <h3 className="text-2xl font-bold">User Details</h3>
            <div className="text-black dark:text-white text-xl flex flex-col md:flex-row md:gap-8 mt-4">
                <div>
                    <p><span className="text-gray-600 dark:text-gray-400 font-bold">First Name: </span> {fetchedData?.user.firstName}</p>
                    <p><span className="text-gray-600 dark:text-gray-400 font-bold">Last Name: </span> {fetchedData?.user.lastName}</p>
                    <p><span className="text-gray-600 dark:text-gray-400 font-bold">Username: </span> {fetchedData?.user.username}</p>
                </div>
                <div>
                    <p><span className=" text-gray-600 dark:text-gray-400 font-bold">UMCN: </span> {fetchedData?.user.umcn}</p>
                    <p><span className=" text-gray-600 dark:text-gray-400 font-bold">Phone Number: </span> {fetchedData?.user.phoneNumber}</p>
                </div>
            </div>
        </div>
      } 
      
    </div>
  );
};

export default UserDetails;
