import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import EmployeeForm from "./EmployeeForm.jsx";
import FORM_TYPE from "../types/formType.js";

const EditEmployee = ({handleClose, open, data, showMessage, setRefresh}) => {
    const [newEmployee, setNewEmployee] = useState(data);
    const {accessToken} = useAuth();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    useEffect(() => {
        setNewEmployee(data);
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let sanitizedData = {};
        Object.entries(newEmployee).forEach(([key, value]) => {
            sanitizedData[key] = typeof value === "string" ? value.trim() : value;
        });

        // Ako nema promena, ne šaljemo PATCH
        if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
            showMessage("Data is same!");
            return;
        }

        try {
            setLoadingUpdate(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/users/${sanitizedData.id}`,
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
            console.log(responseData.message)
            showMessage(responseData.message);
            if (response.ok) setRefresh((prev) => !prev);
        } catch (error) {
            console.error(error);
            showMessage(error.message || "Something went wrong");
        }

        setLoadingUpdate(false);
        handleClose();
    };

    const handleDelete = async () => {
        try {
            setLoadingDelete(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/employees/${data.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) setRefresh((prev) => !prev);
            showMessage("Employee successfully deleted!");
        } catch (error) {
            console.error(error);
            showMessage(error.message || "Something went wrong");
        }

        setLoadingDelete(false);
        handleClose();
    };

    return (
        <EmployeeForm
            type={FORM_TYPE.UPDATE}
            open={open}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            loadingUpdate={loadingUpdate}
            loadingDelete={loadingDelete}
        />
    );
};

export default EditEmployee;
