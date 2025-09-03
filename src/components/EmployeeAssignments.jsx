import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import Table from "./Table";
import {Snackbar} from "@mui/material";
import AssignmentDetails from "./AssignmentDetails";
import CreateAssignment from "./CreateAssignment";

const EmployeeAssignments = ({employeeId}) => {
    const [snackOpen, setSnackOpen] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [refreshAssingments, setRefreshAssingments] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const {fetchedData, fetchData, loading} = useFetch();
    const {accessToken} = useAuth();

    const handleCloseSnack = () => {
        setSnackOpen(false);
    };

    const showMessage = (message) => {
        setSnackMessage(message);
        setSnackOpen(true);
    };

    const showAssignment = (assignment) => {
        setOpenDetails(true);
        setAssignment(assignment);
    };

    useEffect(() => {
        if (employeeId)
            fetchData(
                import.meta.env.VITE_API_URL + `/api/assignments/${employeeId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    }, [employeeId]);

    useEffect(() => {
        if (employeeId)
            fetchData(
                import.meta.env.VITE_API_URL + `/api/assignments/${employeeId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    }, [refreshAssingments]);

    const headers = ["Description", "Posting Date", "Deadline", "Completed"];
    const widths = ["400px", "150px", "150px", "200px"];

    return (
        <>
            <div className="mt-3 text-white">
                <CreateAssignment employeeId={employeeId} setRefresh={setRefreshAssingments}/>
            </div>

            <div
                className="items-center space-y-3 mb-8 mt-8 text-white bg-gray dark:bg-darker-green px-3 py-4 rounded-xl"
                style={{
                    width: "100%",
                    overflow: "auto",
                    height: "calc(100vh - 450px)",
                }}
            >
                <Table
                    headers={headers}
                    widths={widths}
                    data={fetchedData}
                    showData={showAssignment}
                    minWidth={"1000px"}
                    loading={loading}
                    containsComplitedField={true}
                    handleCheck={() => null}
                />
                <AssignmentDetails
                    handleClose={() => setOpenDetails(false)}
                    setRefresh={setRefreshAssingments}
                    open={openDetails}
                    data={assignment}
                    showMessage={showMessage}
                    canEdit={true}
                />
                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    open={snackOpen}
                    autoHideDuration={4000}
                    onClose={handleCloseSnack}
                    message={snackMessage}
                />
            </div>
        </>

    );
};

export default EmployeeAssignments;
