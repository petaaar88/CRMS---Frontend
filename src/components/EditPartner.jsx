import {CircularProgress, Dialog, DialogContent, setRef} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import COLLABORATION_SCORE from "../types/collaborationScore";
import {pascalCaseWord} from "../utils/textUtils";
import {ThemeContext} from "../contexts/ThemeContext";
import {useAuth} from "../contexts/AuthContext";
import useBreakpoints from "../hooks/useBreakpoints";
import INSITUTION_TYPE from "../types/institutionType.js";

const EditPartner = ({handleClose, open, data, showMessage, setRefresh}) => {

    const [newPartner, setNewPartner] = useState(data);
    const {theme} = useContext(ThemeContext);
    const {accessToken} = useAuth();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const {isSmBreakpoint} = useBreakpoints();

    useEffect(() => {
        setNewPartner(data);
    }, [data]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewPartner((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let sanitizedData = {};

        Object.entries(newPartner).forEach(([key, value]) => {
            sanitizedData[key] = typeof value === "string" ? value.trim() : value;
        });

        if (JSON.stringify(data) === JSON.stringify(sanitizedData)) {
            showMessage("Data is same!");
            return;
        }

        try {
            setLoadingUpdate(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/partners/${sanitizedData.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sanitizedData),
                }
            );
            const reponseData = await response.json();
            showMessage(reponseData.message);
            if (response.ok)
                setRefresh(prev => !prev);
        } catch (error) {
            console.error(error);
            showMessage(error);
        }

        setLoadingUpdate(false);
        handleClose();
    };

    const handleDelete = async () => {
        try {
            setLoadingDelete(true);
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/partners/${data.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.ok)
                setRefresh(prev => !prev);
            showMessage("Partner successfully deleted!");

        } catch (error) {
            console.error(error);
            showMessage(error);
        }

        setLoadingDelete(false);
        handleClose();
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
                <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-1 mb-12 sm:mb-4 text-black dark:text-white">
                    Edit Partner
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-7 mb-8 sm:mb-5">
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md mb-1 sm:mb-0 outline-0 w-full sm:w-110 "
                            type="text"
                            name="institutionName"
                            placeholder="Institution Name"
                            value={newPartner?.institutionName || ""}
                            onChange={handleChange}
                            required
                        />
                        <select
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 cursor-pointer w-full sm:w-110 "
                            name="institutionType"
                            value={newPartner?.institutionType || ""}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Choose Institution Type
                            </option>
                            {Object.entries(INSITUTION_TYPE).map(([key, value]) => (
                                <option value={value} key={key}>
                                    {pascalCaseWord(value)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-7 mb-8 sm:mb-5">
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-110 "
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={newPartner?.address || ""}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-110 "
                            type="text"
                            name="city"
                            placeholder="City"
                            value={newPartner?.city || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-7 mb-8 sm:mb-5">
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-110 "
                            type="text"
                            name="contractPersonFullName"
                            placeholder="Contact Person Full Name"
                            value={newPartner?.contractPersonFullName || ""}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-110 "
                            type="text"
                            name="contractPersonPosition"
                            placeholder="Contact Person Position"
                            value={newPartner?.contractPersonPosition || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <select
                            className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 cursor-pointer w-full sm:w-110 "
                            name="collaborationScore"
                            value={String(newPartner?.collaborationScore || "")}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Choose Collaboration Score
                            </option>
                            {Object.entries(COLLABORATION_SCORE).map(([key, value]) => (
                                <option value={value} key={key}>
                                    {pascalCaseWord(key)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">
                        <button
                            className="bg-menu-button-light order-2 sm:order-1 dark:bg-dark-green dark:active:bg-darker-green cursor-pointer text-red-600 dark:text-red-600 disabled:bg-gray-700 dark:disabled:bg-gray-700 py-2 px-7 rounded-md font-bold shadow-md"
                            onClick={handleDelete}
                            type="button"
                            disabled={loadingUpdate || loadingDelete}
                        >
                            {loadingDelete ? (
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
                            )}
                        </button>
                        <button
                            className="bg-menu-button-light order-1 sm:order-2 mb-12 mt-5 sm:mb-0 sm:mt-0 dark:disabled:bg-gray-700 disabled:bg-gray-700 dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md"
                            autoFocus
                            disabled={loadingUpdate || loadingDelete}
                        >
                            {loadingUpdate ? (
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
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditPartner;
