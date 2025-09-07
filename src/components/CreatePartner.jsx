import { useState } from "react";
import FORM_TYPE from "../types/formType";
import PartnerForm from "./PartnerForm";
import { Snackbar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { checkTextLength } from "../utils/textUtils";
import MuiAlert from "@mui/material/Alert";


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
  const [successMessage, setSuccessMessage] = useState(false);

  const [snackMessage, setSnackMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const {accessToken} =  useAuth();
  const [loading, setLoading] = useState(false);

  const showMessage = (message, isMessageSuccessful) => {
    setSnackMessage(message);
    setSnackOpen(true);
    setSuccessMessage(isMessageSuccessful)
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!checkTextLength(newPartner.institutionName,2)){
      showMessage("Institution Name must be at least 2 characters long!", false);
      return;
    }

    if(!checkTextLength(newPartner.address,2)){
      showMessage("Address must be at least 2 characters long!", false);
      return;
    }

    if(!checkTextLength(newPartner.city,2)){
      showMessage("City must be at least 2 characters long!", false);
      return;
    }

    if(!checkTextLength(newPartner.contractPersonFullName,2)){
      showMessage("Contact Person Full Name must be at least 2 characters long!", false);
      return;
    }

    if(!checkTextLength(newPartner.contractPersonPosition,2)){
      showMessage("Contact Person Position must be at least 2 characters long!", false);
      return;
    }



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
        let isMessageSuccessful = false;

        if (response.ok){
          isMessageSuccessful = true;
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

        showMessage(reponseData.message, isMessageSuccessful);

    } catch (error) {
        console.error(error);
        showMessage(error, false);
    }

    setLoading(false);
    handleClose();
      
  }

  return (
    <>
    <button className="text-white bg-menu-button-light  dark:bg-button-dark-green shadow-md rounded-lg px-4 cursor-pointer font-bold text-lg" onClick={()=> setOpen(true)}>Add +</button>
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

export default CreatePartner;
