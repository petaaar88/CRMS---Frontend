import {useState} from "react";
import AssignmentForm from "./AssignmentForm";
import {Snackbar} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import { checkTextLength } from "../utils/textUtils";

const CreateAssignment = ({employeeId, setRefresh}) => {
    const [newAssignment, setNewAssignment] = useState({
        description: "",
        deadline: "",
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

        if(!checkTextLength(newAssignment.description,5)){
            showMessage("Description must be at least 2 characters long!");
            return;
        }

        const sanitizedData = {
            description: newAssignment.description.trim(),
            deadline: newAssignment.deadline,
        };

        try {
            setLoading(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/assignments/${employeeId}`,
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
                setNewAssignment({
                    description: "",
                    deadline: "",
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
                className="bg-menu-button-light dark:bg-button-dark-green shadow-md rounded-lg px-4 py-2 cursor-pointer font-bold text-lg w-auto sm:w-auto"
                onClick={() => setOpen(true)}
            >
                Add +
            </button>

            <AssignmentForm
                open={open}
                newAssignment={newAssignment}
                setNewAssignment={setNewAssignment}
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

export default CreateAssignment;
