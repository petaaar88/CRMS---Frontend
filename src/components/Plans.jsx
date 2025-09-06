import { useState } from "react";

import Table from "../components/Table";
import EditPlan from "../components/EditPlan";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TableContainer from "./TableContainer";
import PlanDetails from "./PlanDetails";

const Plans = ({ plans, loading, setPlans, setFilteredPlans, updatePlansCompletion, desktopTableOffset = 310, mobileTableOffset = 440 }) => {
  const [plan, setPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [loadingCheckUpdate, setLoadingCheckUpdate] = useState(false)
  const {accessToken} = useAuth();

  const handleClose = () => {
    setOpen(false);
    setOpenDetails(false)
  };

  const showPlan = (plan) => {
    setOpenDetails(true);
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
      if (response.ok)
        updatePlansCompletion(planId, completed);

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
  const widths = ["300px", "200px", "300px", "200px"];


  return (
      <>
        <TableContainer desktopOffset={desktopTableOffset} mobileoffset={mobileTableOffset}>
          <Table
              headers={headers}
              widths={widths}
              data={plans}
              showData={showPlan}
              minWidth={"1100px"}
              loading={loading}
              containsComplitedField={true}
              handleCheck={handleCheck}
              loadingCheckUpdate={loadingCheckUpdate}
          />
          <PlanDetails
              handleClose={()=> setOpenDetails(false)}
              open={openDetails}
              data={plan}
              openEdit={()=>setOpen(true)}
          />
          <EditPlan
              handleClose={handleClose}
              setPlans={setPlans}
              setFilteredPlans={setFilteredPlans}
              open={open}
              data={plan}
              showMessage={showMessage}
          />
        </TableContainer>
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
