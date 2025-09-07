import {useState} from "react";
import AssignmentForm from "./AssignmentForm";
import {Snackbar} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import { checkTextLength } from "../utils/textUtils";
import MuiAlert from "@mui/material/Alert";


const CreateAssignment = ({employeeId, setRefresh}) => {
    const [newAssignment, setNewAssignment] = useState({
        description: "",
        deadline: "",
    });
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    const [open, setOpen] = useState(false);
    const {accessToken} = useAuth();
    const [loading, setLoading] = useState(false);

    const showMessage = (message, isMessageSuccessful) => {
        setSnackMessage(message);
        setSnackOpen(true);
        setSuccessMessage(isMessageSuccessful);
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
            showMessage("Description must be at least 2 characters long!", false);
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
            let isMessageSuccessful = false;

            if (response.ok) {
                isMessageSuccessful = true;
                setNewAssignment({
                    description: "",
                    deadline: "",
                });
                setRefresh((prev) => !prev);
            }
            showMessage(responseData.message, isMessageSuccessful);
        } catch (error) {
            console.error(error);
            showMessage(error.message || "An error occurred.", false);
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

export default CreateAssignment;
