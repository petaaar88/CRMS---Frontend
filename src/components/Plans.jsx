import { useState } from "react";

import Table from "../components/Table";
import EditPlan from "../components/EditPlan";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const Plans = ({ plans, loading, setRefresh }) => {
  const [plan, setPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [loadingCheckUpdate, setLoadingCheckUpdate] = useState(false)
  const {accessToken} = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const showPlan = (plan) => {
    setOpen(true);
    setPlan(plan);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const showMessage = (message) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  const handleCheck = async(planId, completed) =>{

    try {
    setLoadingCheckUpdate(true);
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/api/plans/${planId}/completion?completed=${completed}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    
    const responseData = await response.json();
    showMessage(responseData.message);
    if (response.ok) setRefresh((prev) => !prev);
  } catch (error) {
    console.error(error);
    showMessage(error.message || "An error occurred.");
  }

  setLoadingCheckUpdate(false);
  
  }

  const headers = [
    "Institution name",
    "Planned visit date",
    "Planned activities",
    "Completed",
  ];
  const widths = ["200px", "150px", "400px", "100px"];


  return (
    <>
      <div
        className="items-center space-y-3 mb-8 mt-8 bg-gray dark:bg-darker-green px-3 py-4 rounded-xl"
        style={{
          width: "100%",
          overflow: "auto",
          height: "calc(100vh - 250px)",
        }}
      >
        <Table
          headers={headers}
          widths={widths}
          data={plans}
          showData={showPlan}
          minWidth={"900px"}
          loading={loading}
          containsComplitedField={true}
          handleCheck={handleCheck}
          loadingCheckUpdate={loadingCheckUpdate}
        />
        <EditPlan
          handleClose={handleClose}
          setRefresh={setRefresh}
          open={open}
          data={plan}
          showMessage={showMessage}
        />
      </div>
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

export default Plans;
