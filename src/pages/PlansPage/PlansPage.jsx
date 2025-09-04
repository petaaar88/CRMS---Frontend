import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Search from "../../components/Search";
import { useAuth } from "../../contexts/AuthContext";
import FILTER_TYPE from "../../types/filterTypes";
import CreatePlan from "../../components/CreatePlan";
import Plans from "../../components/Plans";
import TablePagination from '@mui/material/TablePagination';
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";

const PlansPage = () => {
  const [plans, setPlans] = useState(null);
  const [filteredPlans, setFilteredPlans] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [errorPlans, setErrorPlans] = useState(null);

  const { user, accessToken } = useAuth();

  // Koristimo custom hook za paginaciju
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
        import.meta.env.VITE_API_URL + `/api/plans/${user.id}`,
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
    <div>
      <Heading title={"Plans"} />
      <div className="dark:bg-dark-green rounded-xl md:p-6">
        <div className="flex flex-col lg:flex-row justify-between px-6 pt-6 md:p-0">
          <div className="mb-4 lg:mb-0">
            <CreatePlan setPlans={setPlans} setFilteredPlans={setFilteredPlans} />
          </div>

          <Search
            data={plans}
            setFilteredData={setFilteredPlans}
            filters={[FILTER_TYPE.DATE]}
          />
        </div>
      
        <Plans
          plans={paginatedData || []}
          loading={loadingPlans}
          setPlans={setPlans}
          setFilteredPlans={setFilteredPlans}
          updatePlansCompletion={updatePlansCompletion}
        />
        <Pagination 
          totalCount={totalCount} 
          page={page} 
          handleChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default PlansPage;