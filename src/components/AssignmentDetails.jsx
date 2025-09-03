import {useEffect, useState, useContext} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";
import CloseIcon from "@mui/icons-material/Close";
import {ThemeContext} from "../contexts/ThemeContext";
import {CircularProgress, Dialog, DialogContent} from "@mui/material";
import useBreakpoints from "../hooks/useBreakpoints.jsx";

const AssignmentDetails = ({
                               handleClose,
                               open,
                               data,
                               showMessage,
                               setRefresh,
                               canEdit = false
                           }) => {
    const {isSmBreakpoint} = useBreakpoints();
    const {accessToken} = useAuth();
    const {theme} = useContext(ThemeContext);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleDelete = async () => {
        try {
            setLoadingDelete(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/assignments/${data.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                setRefresh((prev) => !prev);
                showMessage("Assignment successfully deleted!");
            }
        } catch (error) {
            console.error(error);
            showMessage(error.message || "An error occurred.");
        }

        setLoadingDelete(false);
        handleClose();
    };

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
                        sx={{color: theme === "dark" ? "white" : "black"}}
                    />
                </button>
                <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-1 mb-7 sm:mb-4 pe-8 text-black dark:text-white">
                    Assignment Details
                </h3>
                <div className="flex flex-col text-lg mb-3 gap-2">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400 font-bold">Description:</p>
                        <p className="text-gray-900 dark:text-gray-100">{data?.description}</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <p className="text-gray-600 dark:text-gray-400 font-bold">Created At:</p>
                            <p className="text-gray-900 dark:text-gray-100 ">{data?.postingDate}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-600 dark:text-gray-400 font-bold">Deadline:</p>
                            <p className="text-gray-900 dark:text-gray-100 ">{data?.deadline}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-600 dark:text-gray-400 font-bold">Completed:</p>
                            <p className="text-gray-900 dark:text-gray-100 ">
                                {data?.isCompleted ? "✅ Yes" : "❌ No"}
                            </p>
                        </div>
                    </div>
                </div>
                {
                    canEdit &&
                    <button
                    className="bg-menu-button-light order-2 sm:order-1 dark:bg-dark-green dark:active:bg-darker-green cursor-pointer text-red-600 dark:text-red-600 disabled:bg-gray-700 dark:disabled:bg-gray-700 py-2 px-7 rounded-md font-bold shadow-md"
                    disabled={loadingDelete} onClick={async () => handleDelete()}>{loadingDelete ? (
                        <div className="flex justify-center items-center">
                        <CircularProgress
                            size={20}
                            sx={{
                                color:
                                    theme === "dark"
                                        ? "var(--color-menu-button-dark)"
                                        : "var(--color-button-light-green)",
                                    }}
                        />
                        </div>
                    ) : (
                        "Delete"
                    )}</button>
                }
            </DialogContent>
        </Dialog>
    );
};

export default AssignmentDetails;
