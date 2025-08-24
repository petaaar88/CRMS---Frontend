import { useState } from "react";
import FORM_TYPE from "../types/formType";
import PartnerForm from "./PartnerForm";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const CreatePartner = ({setRefresh}) => {
  const [newPartner, setNewPartner] = useState({
    institutionName: null,
    institutionType: null,
    contractPersonFullName: null,
    contractPersonPosition: null,
    address: null,
    city: null,
    collaborationScore: null,
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const {accessToken} =  useAuth();
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

    let sanitizedData = {}

    Object.entries(newPartner).forEach(([key, value]) => {
        sanitizedData[key] = typeof value === "string" ? value.trim() : value;
    });

    try {
        setLoading(true);
        const response = await fetch(
            import.meta.env.VITE_API_URL + `/api/partners`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sanitizedData),
            }
        );
        const reponseData = await response.json();
        showMessage(reponseData.message);
        if (response.ok){
          setNewPartner({
            institutionName: null,
            institutionType: null,
            contractPersonFullName: null,
            contractPersonPosition: null,
            address: null,
            city: null,
            collaborationScore: null,
          })
          setRefresh(prev => !prev);
        }
    } catch (error) {
        console.error(error);
        showMessage(error);
    }

    setLoading(false);
    handleClose();
      
  }

  return (
    <>
    <button className="bg-menu-button-light dark:bg-button-dark-green shadow-md rounded-lg px-4 cursor-pointer font-bold text-lg" onClick={()=> setOpen(true)}>Add +</button>
    <PartnerForm
        type={FORM_TYPE.CREATE}
        open={open}
        newPartner={newPartner}
        setNewPartner={setNewPartner}
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

export default CreatePartner;
