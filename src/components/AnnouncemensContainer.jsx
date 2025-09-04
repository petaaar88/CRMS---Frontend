import { useState, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AnnouncementButton from "./AnnouncementButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../contexts/ThemeContext";
import { AnnouncementContext } from "../contexts/AnnouncementContext.jsx";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import USER_ROLES from "../types/userRoles";
import { formatDateToString } from "../utils/dateUtils.js";
import LogoutButton from "./LogoutButton.jsx";
import useBreakpoints from "../hooks/useBreakpoints.jsx";

const AnnouncemensContainer = ({ anchorEl, open, onClose }) => {
  const [opend, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { announcements } = useContext(AnnouncementContext);
  const { fetchedData, fetchData, loading, error } = useFetch();
  const { accessToken, user } = useAuth();
  const {isMdBreakpoint} = useBreakpoints();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
          import.meta.env.VITE_API_URL +
          `/api/announcements/download/${fetchedData.id}`,
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
      let filename = fetchedData.fileName;

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

  const showAnnouncement = (announcementId) => {
    setOpen(true);

    fetchData(
        import.meta.env.VITE_API_URL + `/api/announcements/user/${announcementId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
  };

  const renderAnnouncements = () => {
    if (user.role == USER_ROLES.ADMIN) return null;

    if (announcements) {
      if (announcements.length == 0)
        return <p className="text-center py-3">No announcements</p>;

      return announcements.map((announcement) => (
          <MenuItem
              className="hover:!bg-transparent"
              key={announcement.announcementId}
              onClick={onClose}
          >
            <AnnouncementButton
                announcement={announcement}
                showAnnouncement={showAnnouncement}
            />
          </MenuItem>
      ));
    }

    return null;
  };

  return (
      <>
        {
          user.role === USER_ROLES.ADMIN && !isMdBreakpoint ? null :
              <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={onClose}
                  autoFocus={false}
                  disableAutoFocusItem={true}
                  slotProps={{
                    paper: {
                      className:
                          " !bg-light-gray dark:!bg-deep-green dark:!text-white rounded-lg shadow-lg",
                      sx: {
                        width: anchorEl?.offsetWidth,

                      },
                    },
                    list: {
                      className: "p-700",
                    },
                  }}
              >
                {renderAnnouncements()}
                {
                    isMdBreakpoint &&
                    <div className="w-full flex justify-center">
                      <LogoutButton />
                    </div>
                }
              </Menu>
        }
        <Dialog
            open={opend}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 ">
            {loading && (
                <div className="flex flex-col items-center justify-center h-50 w-40 md:w-130 gap-y-3">
                  <CircularProgress
                      size={60}
                      sx={{
                        color:
                            theme === "dark"
                                ? "var(--color-menu-button-dark)"
                                : "var(--color-button-light-green)",
                      }}
                  />
                  <p className="mt-2 text-lg text-black dark:text-white">
                    Loading...
                  </p>
                </div>
            )}
            {error && <p>Error: {error}</p>}
            {fetchedData && (
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
                  <div className="p-2">
                    <h3 className="text-2xl mt-1 mb-4 text-black dark:text-white">
                      {fetchedData.title}
                    </h3>
                    <p className="text-black dark:text-white text-md my-5 italic">
                      Created at: {formatDateToString(fetchedData.createdAt)}
                    </p>
                    <p className="text-black dark:text-white my-5 text-lg">
                      {fetchedData.description}
                    </p>
                    <button
                        className="block bg-menu-button-light dark:bg-button-dark-green text-white p-3 rounded-lg mx-auto cursor-pointer"
                        onClick={handleDownload}
                    >
                      {fetchedData.fileName}
                    </button>
                  </div>
                </>
            )}
          </DialogContent>
        </Dialog>
      </>
  );
};

export default AnnouncemensContainer;
