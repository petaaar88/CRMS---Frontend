import { useContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ReportForm from "./ReportForm.jsx";
import FORM_TYPE from "../types/formType.js";

const EditReport = ({ handleClose, open, data, showMessage, setRefresh }) => {

    const [newReport, setNewReport] = useState(data);
    const { accessToken } = useAuth();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    useEffect(() => {
        setNewReport(data);
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let sanitizedData = {};

        Object.entries(newReport).forEach(([key, value]) => {
            sanitizedData[key] = typeof value === "string" ? value.trim() : value;
        });

        if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
            showMessage("Data is same!");
            return;
        }

        try {
            setLoadingUpdate(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/reports/${sanitizedData.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sanitizedData),
                }
            );
            const responseData = await response.json();
            showMessage(responseData.message);
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
                import.meta.env.VITE_API_URL + `/api/reports/${data.id}`,
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
            showMessage("Report successfully deleted!");

        } catch (error) {
            console.error(error);
            showMessage(error);
        }

        setLoadingDelete(false);
        handleClose();
    };

    return (
        <ReportForm
            type={FORM_TYPE.UPDATE}
            open={open}
            newReport={newReport}
            setNewReport={setNewReport}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            loadingUpdate={loadingUpdate}
            loadingDelete={loadingDelete}
        />
    );
};

export default EditReport;
