import { useState } from "react";
import FORM_TYPE from "../types/formType";
import PlanForm from "./PlanForm";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { checkTextLength } from "../utils/textUtils";

const CreatePlan = ({ setPlans, setFilteredPlans }) => {
  const [newPlan, setNewPlan] = useState({
    institutionName: "",
    plannedVisitDate: "",
    plannedActivities: "",
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [snackMessage, setSnackMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const showMessage = (message, isMessageSuccessful) => {
    setSnackMessage(message);
    setSnackOpen(true);
    setSuccessMessage(isMessageSuccessful);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!checkTextLength(newPlan.institutionName,2)){
      showMessage("Institution Name must be at least 2 characters long!", false);
      return;
    }

    if(!checkTextLength(newPlan.plannedActivities,2)){
      showMessage("Planned Activities must be at least 2 characters long!", false);
      return;
    }

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

      let isMessageSuccessful = false;
      
      if (response.ok) {
        isMessageSuccessful = true;
        setNewPlan({
          institutionName: "",
          plannedVisitDate: "",
          plannedActivities: "",
        });
        setPlans((prev) => ([...prev,responseData.plan ]));
        setFilteredPlans((prev) => ([...prev,responseData.plan ]));
      }

      showMessage(responseData.message,isMessageSuccessful);

    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.", false);
    }

    setLoading(false);
    handleClose();
  };

  return (
    <>
      <button
        className="text-white bg-menu-button-light dark:bg-button-dark-green shadow-md rounded-lg px-4 py-2 cursor-pointer font-bold text-lg w-full"
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
      >
        <MuiAlert
          onClose={handleCloseSnack} 
          severity={successMessage ? "success" : "error"} 
          sx={{ 
            backgroundColor: successMessage ? "seagreen" :"firebrick", 
            color: "white",
            "& .MuiAlert-icon": { color: "white" } 
          }}
        >
          {snackMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default CreatePlan;
