import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";
import useBreakpoints from "../hooks/useBreakpoints";
import FileUploader from "./FileUploader";

const AnnouncementForm = ({
  open,
  newAnnouncement,
  setNewAnnouncement,
  handleClose,
  handleSubmit,
  loadingCreate,
}) => {
  const { theme } = useContext(ThemeContext);
  const { isSmBreakpoint } = useBreakpoints();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setNewAnnouncement((prev) => ({
        ...prev,
        file: files[0],
      }));
    } else {
      setNewAnnouncement((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Dialog
      maxWidth={"900"}
      open={open}
      fullWidth={!isSmBreakpoint}
      onClose={handleClose}
      aria-labelledby="announcement-form-title"
    >
      <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0">
        <button
          onClick={handleClose}
          className="absolute top-5 right-6 cursor-pointer"
        >
          <CloseIcon
            fontSize="large"
            sx={{ color: theme === "dark" ? "white" : "black" }}
          />
        </button>
        <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-1 mb-12 sm:mb-4 text-black dark:text-white pe-8 whitespace-normal break-words">
          Create New Announcement
        </h3>

        <form onSubmit={handleSubmit}>
         
          <div className="flex flex-col gap-7 mb-8 sm:mb-5">
            <input
              className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full"
              type="text"
              name="title"
              placeholder="Title"
              value={newAnnouncement?.title || ""}
              onChange={handleChange}
              minlength="3"
              maxlength="30"
              required
            />
          </div>

         
          <div className="flex flex-col gap-7 mb-8 sm:mb-5">
            <textarea
              className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-200"
              name="description"
              placeholder="Description"
              value={newAnnouncement?.description || ""}
              onChange={handleChange}
              rows={4}
              minlength="3"
              maxlength="700"
              required
            />
          </div>

         
          <div className="flex flex-col gap-7 mb-8 sm:mb-5">
            <FileUploader setNewData={setNewAnnouncement}/>
          </div>

         
          <div className="flex justify-end mt-5">
            <button
              autoFocus
              disabled={loadingCreate}
              className="bg-menu-button-light dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md disabled:bg-gray-700 dark:disabled:bg-gray-700"
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
                "Create Announcement"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementForm;
