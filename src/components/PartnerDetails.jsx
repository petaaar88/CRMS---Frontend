import {Dialog, DialogContent} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";

import {ThemeContext} from "../contexts/ThemeContext";
import {useContext} from "react";
import PartnerFinancialData from "./PartnerFinancialData";


const PartnerDetails = ({open, handleClose, canEdit, data, setOpenEdit}) => {
    const {theme} = useContext(ThemeContext);

    return (
        <Dialog
            maxWidth={"lg"}
            open={open}
            fullWidth={true}
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
                    Partner Details
                </h3>
                <div className="text-black dark:text-white text-xl flex flex-col md:flex-row md:gap-8">
                    <div>
                        <p><span className="text-gray-600 dark:text-gray-400 font-bold">Institution Name: </span> {data?.institutionName}</p>
                        <p><span className="text-gray-600 dark:text-gray-400 font-bold">Institution Type: </span> {data?.institutionType}</p>
                        <p><span className="text-gray-600 dark:text-gray-400 font-bold">Contact Person Full Name: </span> {data?.contractPersonFullName}
                        </p>
                        <p><span className="text-gray-600 dark:text-gray-400 font-bold">Contact Person Position: </span> {data?.contractPersonPosition}
                        </p>
                    </div>
                    <div>
                        <p><span className="text-gray-600 dark:text-gray-400 font-bold">Address: </span> {data?.address}</p>
                        <p><span className="text-gray-600 dark:text-gray-400 font-bold">City: </span> {data?.city}</p>
                        <p><span className="text-gray-600 dark:text-gray-400 font-bold">Collaboration Score: </span> {data?.collaborationScore}</p>
                    </div>
                </div>

                <PartnerFinancialData partnerId={data?.id}/>

                {canEdit && <button
                    className="bg-menu-button-light dark:bg-forest-green cursor-pointer text-white py-2 px-7 rounded-md font-bold shadow-md"
                    onClick={() => setOpenEdit(true)}>Edit Partner</button>}
            </DialogContent>
        </Dialog>
    )
}

export default PartnerDetails