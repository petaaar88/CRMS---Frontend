import {useContext} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {CircularProgress, Dialog, DialogContent} from "@mui/material";
import {ThemeContext} from "../contexts/ThemeContext";
import useBreakpoints from "../hooks/useBreakpoints";

const AssignmentForm = ({
                            open,
                            setNewAssignment,
                            newAssignment,
                            handleClose,
                            handleSubmit,
                            loadingCreate = null,
                        }) => {
    const {theme} = useContext(ThemeContext);
    const {isSmBreakpoint} = useBreakpoints();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewAssignment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog
            maxWidth={"900"}
            open={open}
            fullWidth={!isSmBreakpoint}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 ">
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-6 cursor-pointer"
                >
                    <CloseIcon
                        fontSize="large"
                        sx={{color: theme === "dark" ? "white" : "black"}}
                    />
                </button>
                <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-1 mb-12 sm:mb-4 text-black dark:text-white pe-6 whitespace-normal break-words">
                    Create New Assignment
                </h3>
                <form onSubmit={handleSubmit}>
                    {/* description */}
                    <div className="flex flex-col gap-7 mb-8 sm:mb-5">
            <textarea
                className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full"
                name="description"
                placeholder="Description"
                value={newAssignment?.description || ""}
                onChange={handleChange}
                rows={4}
                minLength={5}
                maxLength={1200}
                required
            />
                    </div>

                    {/* deadline */}
                    <div className="flex flex-col gap-7 mb-8 sm:mb-5">
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-110"
                            type="date"
                            name="deadline"
                            placeholder="Deadline"
                            value={newAssignment?.deadline || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* dugme */}
                    <div className="flex justify-end mt-5">
                        <button
                            autoFocus
                            disabled={loadingCreate}
                            className="bg-menu-button-light dark:disabled:bg-gray-700 disabled:bg-gray-700 dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md"
                        >
                            {loadingCreate ? (
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
                                "Create New Assignment"
                            )}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AssignmentForm;
