import { useState } from "react";
import FORM_TYPE from "../types/formType";
import PlanForm from "./PlanForm";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const CreatePlan = ({ setRefresh }) => {
  const [newPlan, setNewPlan] = useState({
    institutionName: "",
    plannedVisitDate: "",
    plannedActivities: "",
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const showMessage = (message) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // trim polja
    const sanitizedData = {};
    Object.entries(newPlan).forEach(([key, value]) => {
      sanitizedData[key] = typeof value === "string" ? value.trim() : value;
    });

    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL + `/api/plans`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const responseData = await response.json();
      showMessage(responseData.message);

      if (response.ok) {
        setNewPlan({
          institutionName: "",
          plannedVisitDate: "",
          plannedActivities: "",
        });
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.");
    }

    setLoading(false);
    handleClose();
  };

  return (
    <>
      <button
        className="bg-menu-button-light dark:bg-button-dark-green shadow-md rounded-lg px-4 py-2 cursor-pointer font-bold text-lg w-full"
        onClick={() => setOpen(true)}
      >
        Add +
      </button>

      <PlanForm
        type={FORM_TYPE.CREATE}
        open={open}
        newPlan={newPlan}
        setNewPlan={setNewPlan}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loadingCreate={loading}
      />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        message={snackMessage}
      />
    </>
  );
};

export default CreatePlan;
