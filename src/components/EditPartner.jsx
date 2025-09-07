import { useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import PartnerForm from "./PartnerForm.jsx";
import FORM_TYPE from "../types/formType.js";
import { checkTextLength } from "../utils/textUtils.js";


const EditPartner = ({handleClose, open, data, showMessage, setRefresh}) => {

    const [newPartner, setNewPartner] = useState(data);
    const {accessToken} = useAuth();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    useEffect(() => {
        setNewPartner(data);
    }, [data]);

   

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
        

        let sanitizedData = {};

        Object.entries(newPartner).forEach(([key, value]) => {
            sanitizedData[key] = typeof value === "string" ? value.trim() : value;
        });

        if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
            showMessage("Data is same!", false);
            return;
        }

        try {
            setLoadingUpdate(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/partners/${sanitizedData.id}`,
                {
                    method: "PATCH",
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
                setRefresh(prev => !prev);
            }
            showMessage(reponseData.message, isMessageSuccessful);
        } catch (error) {
            console.error(error);
            showMessage(error, false);
        }

        setLoadingUpdate(false);
        handleClose();
    };

    const handleDelete = async () => {
        try {
            setLoadingDelete(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/partners/${data.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            let isMessageSuccessful = false;

            if (response.ok){
                isMessageSuccessful = true;
                setRefresh(prev => !prev);
            }
            showMessage("Partner successfully deleted!", isMessageSuccessful);

        } catch (error) {
            console.error(error);
            showMessage(error, false);
        }

        setLoadingDelete(false);
        handleClose();
    };

    return (
        <PartnerForm type={FORM_TYPE.UPDATE} open={open} newPartner={newPartner} setNewPartner={setNewPartner} handleClose={handleClose} handleSubmit={handleSubmit} handleDelete={handleDelete} loadingUpdate={loadingUpdate}  loadingDelete={loadingDelete} />
    );
};

export default EditPartner;
