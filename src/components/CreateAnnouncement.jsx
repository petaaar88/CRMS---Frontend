import { useState } from "react";
import AnnouncementForm from "./AnnouncementForm";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { checkTextLength } from "../utils/textUtils";
import MuiAlert from "@mui/material/Alert";


const CreateAnnouncement = ({ setAnnouncements, setFilteredAnnouncements }) => {
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    file: null,
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

    if(!checkTextLength(newAnnouncement.title,3)){
      showMessage("Title must be at least 3 characters long!", false);
      return;
    }

    if(!checkTextLength(newAnnouncement.description,3)){
      showMessage("Description must be at least 3 characters long!", false);
      return;
    }

    const formData = new FormData();
    formData.append("title", newAnnouncement.title.trim());
    formData.append("description", newAnnouncement.description.trim());
    if (newAnnouncement.file) formData.append("file", newAnnouncement.file);

    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL + `/api/announcements`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      let isMessageSuccessful = false;
      
      
      if (response.ok) {
        isMessageSuccessful = true;
        setNewAnnouncement({
          title: "",
          description: "",
          file: null,
        });
        setAnnouncements((prev) => ([...prev,responseData.announcement ]));
        setFilteredAnnouncements((prev) => ([...prev,responseData.announcement ]));
      }
      showMessage(responseData.message, isMessageSuccessful);
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

      <AnnouncementForm
        open={open}
        newAnnouncement={newAnnouncement}
        setNewAnnouncement={setNewAnnouncement}
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

export default CreateAnnouncement;
