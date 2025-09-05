import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";
import useBreakpoints from "../hooks/useBreakpoints";
import FORM_TYPE from "../types/formType.js";

const EmployeeForm = ({
                          type,
                          open,
                          setNewEmployee,
                          newEmployee,
                          handleClose,
                          handleSubmit,
                          loadingUpdate = null,
                          loadingCreate = null,
                      }) => {
    const { theme } = useContext(ThemeContext);
    const { isSmBreakpoint } = useBreakpoints();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog
            maxWidth={"600"}
            open={open}
            fullWidth={!isSmBreakpoint}
            onClose={handleClose}
            aria-labelledby="employee-form-title"
            aria-describedby="employee-form-description"
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

                <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-1 mb-12 sm:mb-4 text-black dark:text-white">
                    {type === FORM_TYPE.UPDATE ? "Edit Employee" : "Create New Employee"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                    <input
                        className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full"
                        type="text"
                        name="umcn"
                        placeholder="UMCN"
                        value={newEmployee?.umcn || ""}
                        onChange={handleChange}
                        minLength={13}
                        maxLength={13}
                        required
                    />

                    <div className="flex flex-col sm:flex-row gap-7">
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-1/2"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={newEmployee?.firstName || ""}
                            onChange={handleChange}
                            minLength={2}
                            maxLength={15}
                            required
                        />
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-1/2"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={newEmployee?.lastName || ""}
                            onChange={handleChange}
                            minLength={2}
                            maxLength={15}
                            required
                        />
                    </div>

                    <input
                        className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={newEmployee?.username || ""}
                        onChange={handleChange}
                        minLength={4}
                        maxLength={15}
                        required
                    />

                    <input
                        className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full"
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={newEmployee?.password || ""}
                        onChange={handleChange}
                        minLength={5}
                        maxLength={15}
                        required
                    />

                    <input
                        className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full"
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={newEmployee?.phoneNumber || ""}
                        onChange={handleChange}
                        minLength={5}
                        maxLength={15}
                        required
                    />

                    <div className="flex justify-end gap-3 mt-5">
                        {type === FORM_TYPE.UPDATE ? (

                            <button
                                className="bg-menu-button-light order-1 sm:order-2 dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md"
                                autoFocus
                                disabled={loadingUpdate}
                            >
                                {loadingUpdate ? (
                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            color:
                                                theme === "dark"
                                                    ? "var(--color-menu-button-dark)"
                                                    : "var(--color-button-light-green)",
                                        }}
                                    />
                                ) : (
                                    "Update"
                                )}
                            </button>

                        ) : (
                            <button
                                autoFocus
                                disabled={loadingCreate}
                                className="bg-menu-button-light dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md"
                            >
                                {loadingCreate ? (
                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            color:
                                                theme === "dark"
                                                    ? "var(--color-menu-button-dark)"
                                                    : "var(--color-button-light-green)",
                                        }}
                                    />
                                ) : (
                                    "Create New Employee"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeForm;
