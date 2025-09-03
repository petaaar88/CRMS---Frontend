import {useState} from "react";
import Table from "../components/Table";
import {Snackbar} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import AssignmentDetails from "./AssignmentDetails";

const Assignments = ({assignments, loading, updateAssignmentCompletion}) => {
    const [snackOpen, setSnackOpen] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [assignmentDetails, setAssignmentDetails] = useState(null);
    const [snackMessage, setSnackMessage] = useState(null);
    const [loadingCheckUpdate, setLoadingCheckUpdate] = useState(false);
    const {accessToken} = useAuth();

    const handleCloseSnack = () => {
        setSnackOpen(false);
    };

    const showAssignmentDetails = (assignmentDetails) =>{
        setOpenDetails(true);
        setAssignmentDetails(assignmentDetails);
    }

    const showMessage = (message) => {
        setSnackMessage(message);
        setSnackOpen(true);
    };

    const handleCheck = async (assignmentId, isCompleted) => {
        try {
            setLoadingCheckUpdate(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL +
                `/api/assignments/${assignmentId}/completion?completed=${isCompleted}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const responseData = await response.json();
            showMessage(responseData.message);

            if (response.ok)
                updateAssignmentCompletion(assignmentId, isCompleted);

        } catch (error) {
            console.error(error);
            showMessage(error.message || "An error occurred.");
        } finally {
            setLoadingCheckUpdate(false);
        }
    };

    const headers = ["Description", "Posting Date", "Deadline", "Completed"];
    const widths = ["400px", "150px", "150px", "200px"];

    return (
        <>
            <div
                className="items-center space-y-3 mb-8 mt-8 bg-gray dark:bg-darker-green px-3 py-4 rounded-xl"
                style={{
                    width: "100%",
                    overflow: "auto",
                    height: "calc(100vh - 250px)",
                }}
            >
                <Table
                    headers={headers}
                    widths={widths}
                    data={assignments}
                    showData={showAssignmentDetails}
                    minWidth={"1000px"}
                    loading={loading}
                    containsComplitedField={true}
                    handleCheck={handleCheck}
                    loadingCheckUpdate={loadingCheckUpdate}
                />
                <AssignmentDetails
                    handleClose={() => setOpenDetails(false)}
                    open={openDetails}
                    data={assignmentDetails}
                    canEdit={false}
                />
            </div>
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

export default Assignments;
