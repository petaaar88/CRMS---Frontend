import {useState} from "react"

import Table from "../components/Table"
import EditPartner from "../components/EditPartner";
import {Snackbar} from "@mui/material";
import PartnerDetails from "./PartnerDetails";
import TableContainer from "./TableContainer";
import MuiAlert from "@mui/material/Alert";

const Partners = ({partners, loading, setRefresh}) => {
    const [partner, setPartner] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [snackMessage, setSnackMessage] = useState(null);

    const showPartner = (partner) => {
        setOpenDetails(true);
        setPartner(partner);
    };

    const handleCloseSnack = () => {
        setSnackOpen(false);
    };

    const showMessage = (message, isMessageSuccessful) => {
        setSnackMessage(message);
        setSnackOpen(true);
        setSuccessMessage(isMessageSuccessful);
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
        "200px",
    ];

    return (
        <>
            <TableContainer>
                <Table
                    headers={headers}
                    widths={widths}
                    data={partners}
                    showData={showPartner}
                    minWidth={"1900px"}
                    loading={loading}
                />
                <EditPartner
                    handleClose={() => {
                        setOpenEdit(false);
                        setOpenDetails(false);
                    }}
                    setRefresh={setRefresh}
                    open={openEdit}
                    data={partner}
                    showMessage={showMessage}
                    />
                <PartnerDetails
                    handleClose={() => setOpenDetails(false)}
                    open={openDetails}
                    data={partner}
                    canEdit={true}
                    setOpenEdit={setOpenEdit}
                />
            </TableContainer>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
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

export default Partners;
