import { Snackbar } from "@mui/material";
import { useState } from "react";
import Table from "./Table";
import EditReport from "./EditReport";
import TableContainer from "./TableContainer";
import ReportDetails from "./ReportDetails";

const Reports = ({ reports, loading, setRefresh }) => {
  const [report, setReport] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);

  const handleEditClose = () => {
    setOpenEdit(false);
    setOpenDetails(false);
  };

  const showReportDetails = (report) => {
    setOpenDetails(true);
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
              showData={showReportDetails}
              minWidth={"1800px"}
              loading={loading}
          />
          <ReportDetails
              open={openDetails}
              handleClose={() => setOpenDetails(false)}
              canEdit={true}
              data={report}
              setOpenEdit={setOpenEdit}
          />
          <EditReport
              handleClose={handleEditClose}
              setRefresh={setRefresh}
              open={openEdit}
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
