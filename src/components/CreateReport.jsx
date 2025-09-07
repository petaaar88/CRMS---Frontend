import { useState } from "react";
import FORM_TYPE from "../types/formType";
import ReportForm from "./ReportForm";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { checkTextLength } from "../utils/textUtils";
import MuiAlert from "@mui/material/Alert";


const CreateReport = ({ setRefresh }) => {
  const [newReport, setNewReport] = useState({
    institutionName: null,
    firstAndLastNameOfSalesRepresentative: null,
    visitDate: null,
    visitOutcome: null,
    reportText: null
  });

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

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

     if(!checkTextLength(newReport.institutionName,2)){
          showMessage("Institution Name must be at least 2 characters long!", false);
          return;
      }

      if(!checkTextLength(newReport.firstAndLastNameOfSalesRepresentative,2)){
          showMessage("Sales representative name must be at least 2 characters long!", false);
          return;
      }

      if(!checkTextLength(newReport.reportText,3)){
          showMessage("Report must be at least 3 characters long!", false);
          return;
      }

    let sanitizedData = {};
    Object.entries(newReport).forEach(([key, value]) => {
      sanitizedData[key] = typeof value === "string" ? value.trim() : value;
    });

    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/reports`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedData),
        }
      );
      const responseData = await response.json();

      let isMessageSuccessful = false;

      if (response.ok) {
        isMessageSuccessful = true
        setNewReport({
          institutionName: null,
          firstAndLastNameOfSalesRepresentative: null,
          visitDate: null,
          visitOutcome: null,
          reportText: null
        });
        setRefresh((prev) => !prev);
      }
      showMessage(responseData.message, isMessageSuccessful);
    } catch (error) {
      console.error(error);
      showMessage(error, false);
    }

    setLoading(false);
    handleClose();
  };

  return (
    <>
      <button
        className="text-white   bg-menu-button-light dark:bg-button-dark-green shadow-md rounded-lg px-4 cursor-pointer font-bold text-lg"
        onClick={() => setOpen(true)}
      >
        Add +
      </button>
      <ReportForm
        type={FORM_TYPE.CREATE}
        open={open}
        newReport={newReport}
        setNewReport={setNewReport}
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

export default CreateReport;
