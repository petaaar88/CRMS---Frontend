import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PlanForm from "./PlanForm.jsx";
import FORM_TYPE from "../types/formType.js";

const EditPlan = ({ handleClose, open, data, showMessage, setRefresh }) => {
  const [newPlan, setNewPlan] = useState(data);
  const { accessToken } = useAuth();
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setNewPlan(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedData = {};
    Object.entries(newPlan).forEach(([key, value]) => {
      sanitizedData[key] = typeof value === "string" ? value.trim() : value;
    });

    if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
      showMessage("Data is same!");
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
      showMessage(responseData.message);
      if (response.ok) setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.");
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

      if (response.ok) setRefresh((prev) => !prev);
      showMessage("Plan successfully deleted!");
    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.");
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
