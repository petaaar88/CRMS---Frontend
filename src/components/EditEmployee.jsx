import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import EmployeeForm from "./EmployeeForm.jsx";
import FORM_TYPE from "../types/formType.js";
import { checkTextLength, isNumeric, isPhoneNumber } from "../utils/textUtils.js";

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

        if(!checkTextLength(newEmployee.firstName,2)){
            showMessage("First Name must be at least 2 characters long!", false);
            return;
        }

        if(!checkTextLength(newEmployee.lastName,2)){
            showMessage("Last Name must be at least 2 characters long!", false);
            return;
        }

        if(!isNumeric(newEmployee.umcn)){
            showMessage("UMCN must consist of digits only!", false);
            return;
        }

        if(!checkTextLength(newEmployee.username, 4)){
            showMessage("Username must be at least 4 characters long!", false);
            return;
        }

        if(!checkTextLength(newEmployee.password, 5)){
            showMessage("Password must be at least 4 characters long!", false);
            return;
        }

         if(!isPhoneNumber(newEmployee.phoneNumber)){
            showMessage("Invalid phone number format", false);
            return;
        }


        let sanitizedData = {};
        Object.entries(newEmployee).forEach(([key, value]) => {
            sanitizedData[key] = typeof value === "string" ? value.trim() : value;
        });

        // Ako nema promena, ne šaljemo PATCH
        if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
            showMessage("Data is same!", false);
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
            let isMessageSuccessful = false;

            if (response.ok){ 
                isMessageSuccessful = true;
                setRefresh((prev) => !prev);
            }
            showMessage(responseData.message, isMessageSuccessful);
        } catch (error) {
            console.error(error);
            showMessage(error.message || "Something went wrong", false);
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
            showMessage("Employee successfully deleted!", true);
        } catch (error) {
            console.error(error);
            showMessage(error.message || "Something went wrong", false);
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
