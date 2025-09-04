import { Snackbar } from "@mui/material";
import { useState } from "react";
import Table from "./Table";
import EditReport from "./EditReport";
import TableContainer from "./TableContainer";

const Reports = ({ reports, loading, setRefresh }) => {
  const [report, setReport] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const showReport = (report) => {
    setOpen(true);
    setReport(report);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const showMessage = (message) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  const headers = [
    "Institution name",
    "Sales Representative",
    "Visit Date",
    "Visit Outcome",
    "Report Text"
  ];

  const widths = [
    "220px",
    "200px",
    "150px",
    "150px",
    "300px",
  ];

  return(
    <>
      <TableContainer>
        <Table
          headers={headers}
          widths={widths}
          data={reports}
          showData={showReport}
          minWidth={"1800px"}
          loading={loading}
        />
        <EditReport
          handleClose={handleClose}
          setRefresh={setRefresh}
          open={open}
          data={report}
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

export default Reports;
