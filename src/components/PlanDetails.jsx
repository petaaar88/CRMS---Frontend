import { useEffect, useState, useContext } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../contexts/ThemeContext";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import useBreakpoints from "../hooks/useBreakpoints.jsx";

const PlanDetails = ({
                         handleClose,
                         open,
                         data,
                         openEdit
                     }) => {
    const { isSmBreakpoint } = useBreakpoints();
    const { theme } = useContext(ThemeContext);


    return (
        <Dialog
            maxWidth={"md"}
            open={open}
            fullWidth={!isSmBreakpoint}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 relative">
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-6 cursor-pointer"
                >
                    <CloseIcon
                        fontSize="large"
                        sx={{ color: theme === "dark" ? "white" : "black" }}
                    />
                </button>
                <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-1 mb-7 sm:mb-4 pe-8 text-black dark:text-white">
                    Plan Details
                </h3>
                <div className="flex flex-col text-lg mb-3 gap-2">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400 font-bold">
                            Description:
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">
                            {data?.institutionName}
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <p className="text-gray-600 dark:text-gray-400 font-bold">
                                Planned Visit Date:
                            </p>
                            <p className="text-gray-900 dark:text-gray-100 ">
                                {data?.plannedVisitDate}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-600 dark:text-gray-400 font-bold">
                                Planned Activities:
                            </p>
                            <p className="text-gray-900 dark:text-gray-100 ">
                                {data?.plannedActivities}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-600 dark:text-gray-400 font-bold">
                                Completed:
                            </p>
                            <p className="text-gray-900 dark:text-gray-100 ">
                                {data?.isCompleted ? "✅ Yes" : "❌ No"}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    className="bg-menu-button-light dark:bg-forest-green cursor-pointer text-white py-2 px-7 rounded-md font-bold shadow-md"
                    onClick={openEdit}
                >
                    Edit
                </button>

            </DialogContent>
        </Dialog>
    );
};

export default PlanDetails;
