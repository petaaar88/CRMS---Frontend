import { useState } from "react";
import FORM_TYPE from "../types/formType";
import AnnouncementForm from "./AnnouncementForm";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const CreateAnnouncement = ({ setRefresh }) => {
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    file: null,
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
      showMessage(responseData.message);

      if (response.ok) {
        setNewAnnouncement({
          title: "",
          description: "",
          file: null,
        });
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.");
    }

    setLoading(false);
    handleClose();
  };

  return (
    <>
      <button
        className="bg-menu-button-light dark:bg-button-dark-green shadow-md rounded-lg px-4 py-2 cursor-pointer font-bold text-lg w-full"
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
      />
    </>
  );
};

export default CreateAnnouncement;
