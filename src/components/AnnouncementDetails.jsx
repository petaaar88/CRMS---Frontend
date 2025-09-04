import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useState } from "react";
import { formatDateToString } from "../utils/dateUtils";

const AnnouncementDetails = ({
                               handleClose,
                               setAnnouncements,
                               setFilteredAnnouncements,
                               open,
                               data,
                               showMessage,
                             }) => {
  const { theme } = useContext(ThemeContext);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(
          import.meta.env.VITE_API_URL + `/api/announcements/download/${data.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
      );

      if (!response.ok) throw new Error("Greška pri preuzimanju fajla");

      const blob = await response.blob();

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = data.fileName;

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) filename = match[1];
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      console.log(data);

      const response = await fetch(
          import.meta.env.VITE_API_URL + `/api/announcements/${data.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
      );
      const responseData = await response.json();

      if (response.ok) {
        setAnnouncements((prev) => prev.filter(a => a.id !== data.id));
        setFilteredAnnouncements((prev) => prev.filter(a => a.id !== data.id));
        showMessage("Announcement successfully deleted!");
      }
      else
        throw Error();

    } catch (error) {
      console.error(error);
      showMessage(error.message || "An error occurred.");
    }

    setLoading(false);
    handleClose();
  };

  return (
      data && (
          <Dialog
              open={open}
              onClose={handleClose}
              maxWidth={"sm"}
              fullWidth={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 ">
              <>
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-6 cursor-pointer"
                >
                  <CloseIcon
                      fontSize="large"
                      sx={{ color: theme === "dark" ? "white" : "black" }}
                  />
                </button>
                <div className="p-0">
                  <h3 className="pe-8 text-2xl mt-1 mb-4 text-black dark:text-white">
                    {data.title}
                  </h3>
                  <p className="text-black dark:text-white text-md my-5 italic">
                    Created at: {formatDateToString(data.createdAt)}
                  </p>
                  <p className="text-black dark:text-white my-5 text-lg">
                    {data.description}
                  </p>
                  <button
                      className="block bg-menu-button-light dark:bg-button-dark-green text-white p-3 rounded-lg mx-auto cursor-pointer"
                      onClick={handleDownload}
                  >
                    {data.fileName}
                  </button>
                  <button
                      className="bg-menu-button-light order-2 sm:order-1 mt-4 dark:bg-dark-green dark:active:bg-darker-green cursor-pointer text-red-600 dark:text-red-600 disabled:bg-gray-700 dark:disabled:bg-gray-700 py-2 px-7 rounded-md font-bold shadow-md"
                      onClick={handleDelete}
                      type="button"
                      disabled={loading}
                  >
                    {loading ? (
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
                </div>
              </>
            </DialogContent>
          </Dialog>
      )
  );
};

export default AnnouncementDetails;
