import { useState } from "react"

import Table from "../components/Table"
import EditPartner from "../components/EditPartner";
import { Snackbar } from "@mui/material";

const Partners = ({ partners, loading, setRefresh }) => {
  const [partner, setPartner] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const showPartner = (partner) => {
    setOpen(true);
    setPartner(partner);
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
    "Institution type",
    "Contact person",
    "Contact person postition",
    "Adress",
    "City",
    "Collaboration score",
  ];
  const widths = [
    "200px",
    "200px",
    "400px",
    "300px",
    "300px",
    "100px",
    "100px",
  ];

  return (
    <>
      <div
        className="items-center space-y-3 mb-8 mt-8 bg-gray dark:bg-darker-green  px-3 py-4 rounded-xl"
        style={{
          width: "100%",
          overflow: "auto",
          height: "calc(100vh - 250px)",
        }}
      >
        <Table
          headers={headers}
          widths={widths}
          data={partners}
          showPartner={showPartner}
          minWidth={"1800px"}
          loading={loading}
        />
        <EditPartner
          handleClose={handleClose}
          setRefresh={setRefresh}
          open={open}
          data={partner}
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

export default Partners;
