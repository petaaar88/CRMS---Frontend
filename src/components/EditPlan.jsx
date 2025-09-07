import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PlanForm from "./PlanForm.jsx";
import FORM_TYPE from "../types/formType.js";
import { checkTextLength } from "../utils/textUtils.js";

const EditPlan = ({ handleClose, open, data, showMessage, setPlans, setFilteredPlans }) => {
  const [newPlan, setNewPlan] = useState(data);
  const { accessToken } = useAuth();
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setNewPlan(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!checkTextLength(newPlan.institutionName,2)){
      showMessage("Institution Name must be at least 2 characters long!",false);
      return;
    }

    if(!checkTextLength(newPlan.plannedActivities,2)){
      showMessage("Planned Activities must be at least 2 characters long!",false);
      return;
    }

    const sanitizedData = {};
    Object.entries(newPlan).forEach(([key, value]) => {
      sanitizedData[key] = typeof value === "string" ? value.trim() : value;
    });

    if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
      showMessage("Data is same!",false);
      return;
    }

    try {
      setLoadingUpdate(true);
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/plans/${sanitizedData.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedData),
        }
      );

      const responseData = await response.json();
      let isMessageSuccessful = false;

      if (response.ok){
        isMessageSuccessful = true;
        setPlans((prev) =>
          prev.map((plan) => (plan.id === responseData.plan.id ? responseData.plan : plan))
        );
        setFilteredPlans((prev) =>
          prev.map((plan) => (plan.id === responseData.plan.id ? responseData.plan : plan))
      );

      showMessage(responseData.message, isMessageSuccessful);
  }
    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.", false);
    }

    setLoadingUpdate(false);
    handleClose();
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/plans/${data.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok){
        setPlans((prev) => prev.filter((plan) => plan.id !== data.id));
        setFilteredPlans((prev) => prev.filter((plan) => plan.id !== data.id));
        showMessage("Plan successfully deleted!", true);
      } else {
        showMessage("Failed to delete plan.", false);
      }
    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.", false);
    }

    setLoadingDelete(false);
    handleClose();
  };

  return (
    <PlanForm
      type={FORM_TYPE.UPDATE}
      open={open}
      newPlan={newPlan}
      setNewPlan={setNewPlan}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      loadingUpdate={loadingUpdate}
      loadingDelete={loadingDelete}
    />
  );
};

export default EditPlan;
