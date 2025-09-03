import {useState} from "react";
import EmployeeForm from "./EmployeeForm";
import {Snackbar} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";

const CreateEmployee = ({setRefresh}) => {
    const [newEmployee, setNewEmployee] = useState({
        umcn: null,
        firstName: null,
        lastName: null,
        username: null,
        password: null,
        phoneNumber: null,
    });

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const {accessToken} = useAuth();
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

        let sanitizedData = {};

        Object.entries(newEmployee).forEach(([key, value]) => {
            sanitizedData[key] = typeof value === "string" ? value.trim() : value;
        });

        try {
            setLoading(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/users`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sanitizedData),
                }
            );
            const responseData = await response.json();
            showMessage(responseData.message);

            if (response.ok) {
                setNewEmployee({
                    umcn: null,
                    firstName: null,
                    lastName: null,
                    username: null,
                    password: null,
                    phoneNumber: null,
                });
                setRefresh((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
            showMessage(error.message || "Something went wrong");
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

            <EmployeeForm
                open={open}
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                loadingCreate={loading}
            />

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

export default CreateEmployee;