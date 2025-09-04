import {useState} from "react";
import Table from "../components/Table";
import {Snackbar} from "@mui/material";
import AnnouncementDetails from "./AnnouncementDetails";
import TableContainer from "./TableContainer";

const Announcements = ({announcements, loading, setAnnouncements, setFilteredAnnouncements}) => {
    const [announcement, setAnnouncement] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const showAnnouncement = (announcement) => {
        setOpen(true);
        setAnnouncement(announcement);
    };

    const handleCloseSnack = () => {
        setSnackOpen(false);
    };

    const showMessage = (message) => {
        setSnackMessage(message);
        setSnackOpen(true);
    };

    const headers = ["Title", "Description", "Created At", "Attachment"];
    const widths = ["200px", "300px", "200px", "300px"];

    return (
        <>
            <TableContainer>
                <Table
                    headers={headers}
                    widths={widths}
                    data={announcements}
                    showData={showAnnouncement}
                    minWidth={"1100px"}
                    loading={loading}
                />
                <AnnouncementDetails
                    handleClose={handleClose}
                    setAnnouncements={setAnnouncements}
                    setFilteredAnnouncements={setFilteredAnnouncements}
                    open={open}
                    data={announcement}
                    showMessage={showMessage}
                />
            </TableContainer>

            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnack}
                message={snackMessage}
            />
        </>
    );
};

export default Announcements;
