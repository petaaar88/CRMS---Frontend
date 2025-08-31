import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Search from "../../components/Search";
import { useAuth } from "../../contexts/AuthContext";
import FILTER_TYPE from "../../types/filterTypes";
import CreatePlan from "../../components/CreatePlan";
import useBreakpoints from "../../hooks/useBreakpoints";
import Plans from "../../components/Plans";

const PlansPage = () => {
  const [plans, setPlans] = useState(null);
  const [filteredPlans, setFilteredPlans] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [errorPlans, setErrorPlans] = useState(null);
  const [refreshPlans, setRefreshPlans] = useState(false);

  const { user, accessToken } = useAuth();
  const { isLgBreakpoint } = useBreakpoints();

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

  useEffect(() => {
    fetchPlans();
  }, [refreshPlans]);

  return (
    <div>
      <Heading title={"Plans"} />
      <div className="dark:bg-dark-green rounded-xl p-6">
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="mb-4 lg:mb-0">
            <CreatePlan setRefresh={setRefreshPlans} />
          </div>

          <Search
            data={plans}
            setFilteredData={setFilteredPlans}
            filters={[FILTER_TYPE.DATE]}
          />
        </div>

        <Plans
          plans={filteredPlans}
          loading={loadingPlans}
          setRefresh={setRefreshPlans}
        />
      </div>
    </div>
  );
};

export default PlansPage;
