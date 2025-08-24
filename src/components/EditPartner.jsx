import {useContext, useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import PartnerForm from "./PartnerForm.jsx";
import FORM_TYPE from "../types/formType.js";

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

        let sanitizedData = {};

        Object.entries(newPartner).forEach(([key, value]) => {
            sanitizedData[key] = typeof value === "string" ? value.trim() : value;
        });

        if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
            showMessage("Data is same!");
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
            showMessage(reponseData.message);
            if (response.ok)
                setRefresh(prev => !prev);
        } catch (error) {
            console.error(error);
            showMessage(error);
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

            if (response.ok)
                setRefresh(prev => !prev);
            showMessage("Partner successfully deleted!");

        } catch (error) {
            console.error(error);
            showMessage(error);
        }

        setLoadingDelete(false);
        handleClose();
    };

    return (
        <PartnerForm type={FORM_TYPE.UPDATE} open={open} newPartner={newPartner} setNewPartner={setNewPartner} handleClose={handleClose} handleSubmit={handleSubmit} handleDelete={handleDelete} loadingUpdate={loadingUpdate}  loadingDelete={loadingDelete} />
    );
};

export default EditPartner;
