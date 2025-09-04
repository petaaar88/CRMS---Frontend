import {useState} from "react";

import Table from "../components/Table";
import EditEmployee from "../components/EditEmployee";
import {Snackbar} from "@mui/material";
import EmployeeDetails from "./EmployeeDetails";
import TableContainer from "./TableContainer";

const Employees = ({employees, loading, setRefresh}) => {
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [openEmployeeDetails, setOpenEmployeeDetails] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);


    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);


    const showEmployee = (employee) => {

        setEmployeeDetails(employee);
        setOpenEmployeeDetails(true);

    };

    const handleCloseSnack = () => {
        setSnackOpen(false);
    };

    const showMessage = (message) => {
        setSnackMessage(message);
        setSnackOpen(true);
    };

    const headers = [
        "UMCN",
        "FirstName",
        "LastName",
        "Username",
        "PhoneNumber",
        "CreatedAt",
    ];

    const widths = [
        "200px",
        "150px",
        "150px",
        "150px",
        "150px",
        "150px",
    ];

    return (
        <>
            <TableContainer>
                <Table
                    headers={headers}
                    widths={widths}
                    data={employees}
                    showData={showEmployee}
                    minWidth={"1100px"}
                    loading={loading}
                />
                <EmployeeDetails
                    open={openEmployeeDetails}
                    handleClose={() => setOpenEmployeeDetails(false)}
                    data={employeeDetails}
                    setEditEmployee={setEditEmployee}
                    setOpenEdit={setOpenEdit}
                />
                <EditEmployee
                    handleClose={() => {
                        setOpenEdit(false);
                        setOpenEmployeeDetails(false);
                    }}
                    setRefresh={setRefresh}
                    open={openEdit}
                    data={editEmployee}
                    showMessage={showMessage}
                />
            </TableContainer>

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

export default Employees;
