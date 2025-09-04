import {Dialog, DialogContent, useMediaQuery, useTheme} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAuth} from "../contexts/AuthContext";
import {ThemeContext} from "../contexts/ThemeContext";
import {useContext, useState} from "react";
import EmployeePartners from "./EmployeePartners";
import EmployeeReports from "./EmployeeReports";
import EmployeeAssignments from "./EmployeeAssignments";
import useBreakpoints from "../hooks/useBreakpoints";
import { formatDateToString } from "../utils/dateUtils";

const EmployeeDetails = ({open, handleClose, data, setEditEmployee, setOpenEdit}) => {

    const PAGES = {
        PARTNERS: 1,
        REPORTS: 2,
        ASSIGNMENTS: 3
    };

    const [currentPage, setCurrentPage] = useState(PAGES.PARTNERS);
    const {theme} = useContext(ThemeContext);
    const {accessToken} = useAuth();
    const muiTheme = useTheme();
    const fullScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
    const{isMdBreakpoint, isSmBreakpoint} = useBreakpoints();

    const showEdit = async (employee) => {

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/users/${employee.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) throw new Error();

            const result = await response.json();
            setOpenEdit(true);
            setEditEmployee(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog
            maxWidth={"xl"}
            open={open}
            fullScreen={fullScreen}
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="employee-form-title"
            aria-describedby="employee-form-description"
        >
            <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 relative" style={{padding: isMdBreakpoint ? "22px":"0px"}}>
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-6 cursor-pointer"
                >
                    <CloseIcon
                        fontSize="large"
                        sx={{color: theme === "dark" ? "white" : "black"}}
                    />
                </button>
                <div className="px-5 pt-3 md:p-0 md:px-5">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-4 mb-3 sm:mb-4 pe-8 text-black dark:text-white">
                            Employee Details
                        </h3>
                        <div className="mb-2 md:mb-0">
                            <button
                                className="bg-menu-button-light dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md"
                                onClick={async () => showEdit(data)}>Update
                            </button>
                        </div>

                    </div>
                    <div className="text-black dark:text-white text-xl flex flex-col md:flex-row md:gap-8">
                        <div>
                            <p><span className="text-gray-600 dark:text-gray-400 font-bold">First Name: </span> {data?.firstName}</p>
                            <p><span className="text-gray-600 dark:text-gray-400 font-bold">Last Name: </span> {data?.lastName}</p>
                            <p><span className="text-gray-600 dark:text-gray-400 font-bold">Username: </span> {data?.username}</p>
                        </div>
                        <div>
                            <p><span className=" text-gray-600 dark:text-gray-400 font-bold">UMCN: </span> {data?.umcn}</p>
                            <p><span className=" text-gray-600 dark:text-gray-400 font-bold">Phone Number: </span> {data?.phoneNumber}</p>
                            <p><span className=" text-gray-600 dark:text-gray-400 font-bold">Created At: </span>{formatDateToString(data?.createdAt)}</p>
                        </div>
                    </div>

                </div>
                <div className="flex gap-5 dark:text-white mt-5 px-5 md:p-0 md:px-5">
                    <button
                        className={
                            "text-lg border-b-3 font-bold cursor-pointer " +
                            (currentPage === PAGES.PARTNERS
                                ? " text-button-light-green border-button-light-green "
                                : " border-transparent")
                        }
                        onClick={() => {
                            if (currentPage != PAGES.PARTNERS) {
                                setCurrentPage(PAGES.PARTNERS);
                            }
                        }}
                    >
                        Partners
                    </button>
                    <button
                        className={
                            "text-lg border-b-3 font-bold cursor-pointer " +
                            (currentPage === PAGES.REPORTS
                                ? " text-button-light-green border-button-light-green "
                                : " border-transparent")
                        }
                        onClick={() => {
                            if (currentPage != PAGES.REPORTS) {
                                setCurrentPage(PAGES.REPORTS);
                            }
                        }}
                    >
                        Reports
                    </button>
                    <button
                        className={
                            "text-lg border-b-3 font-bold cursor-pointer " +
                            (currentPage === PAGES.ASSIGNMENTS
                                ? " text-button-light-green border-button-light-green "
                                : " border-transparent")
                        }
                        onClick={() => {
                            if (currentPage != PAGES.ASSIGNMENTS) {
                                setCurrentPage(PAGES.ASSIGNMENTS);
                            }
                        }}
                    >
                        Assignments
                    </button>
                </div>
                {currentPage === PAGES.PARTNERS && <EmployeePartners employeeId={data?.id}/>}
                {currentPage === PAGES.REPORTS && <EmployeeReports employeeId={data?.id}/>}
                {currentPage === PAGES.ASSIGNMENTS && <EmployeeAssignments employeeId={data?.id}/>}

            </DialogContent>
        </Dialog>
    );
};

export default EmployeeDetails;
