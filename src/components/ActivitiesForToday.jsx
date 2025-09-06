import { useContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";
import Plans from "./Plans";
import Pagination from "./Pagination";
import usePagination from "../hooks/usePagination";

const ActivitiesForToday = () => {

  const { theme } = useContext(ThemeContext);
  const [plans, setPlans] = useState(null);
  const [filteredPlans, setFilteredPlans] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [errorPlans, setErrorPlans] = useState(null);

  const { user, accessToken } = useAuth();

  const {
    page,
    rowsPerPage,
    paginatedData,
    totalCount,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePagination(filteredPlans, 10);

  const updatePlansCompletion = (planId, isCompleted) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, isCompleted } : p
      )
    );
    setFilteredPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, isCompleted } : p
      )
    );
  };

  const fetchPlans = async () => {
    setLoadingPlans(true);
    setPlans(null);
    setErrorPlans(null);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/plans/${user.id}?for-today=true`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      const result = await response.json();

      setPlans(result);
      setFilteredPlans(result);
    } catch (err) {
      setErrorPlans(err.message || "An error occurred.");
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="dark:bg-deep-green rounded-xl pt-8 px-0 md:px-8 mt-7 mx-0 md:mx-0 shadow-lg">
             {loadingPlans ? 
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
            <h3 className="text-2xl font-bold px-8 md:px-0">Today's Planned Activities</h3>
            {
                plans?.length == 0 ? 
                    <p className="mt-3 text-lg text-gray-400 pb-7">No planned activities for today</p> 
                :
                    <div className="md:pb-3">
                        <Plans
                            plans={paginatedData || []}
                            loading={loadingPlans}
                            setPlans={setPlans}
                            setFilteredPlans={setFilteredPlans}
                            updatePlansCompletion={updatePlansCompletion}
                            desktopTableOffset ={580}
                            mobileTableOffset ={650}
                            />
                        <Pagination 
                            totalCount={totalCount} 
                            page={page} 
                            handleChangePage={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
            }
            
        </div>
      } 
    </div>
  );
};

export default ActivitiesForToday;
