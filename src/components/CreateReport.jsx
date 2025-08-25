import { useState } from "react";
import FORM_TYPE from "../types/formType";
import ReportForm from "./ReportForm";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

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
      console.log(responseData);
      
      showMessage(responseData.message);
      if (response.ok) {
        setNewReport({
          institutionName: null,
          firstAndLastNameOfSalesRepresentative: null,
          visitDate: null,
          visitOutcome: null,
          reportText: null
        });
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
      showMessage(error);
    }

    setLoading(false);
    handleClose();
  };

  return (
    <>
      <button
        className="bg-menu-button-light dark:bg-button-dark-green shadow-md rounded-lg px-4 cursor-pointer font-bold text-lg"
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
      />
    </>
  );
};

export default CreateReport;
