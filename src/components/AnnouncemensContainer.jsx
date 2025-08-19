import { useState, useRef, useContext, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AnnouncementButton from "./AnnouncementButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../contexts/ThemeContext";
import { AnnoucementContext } from "../contexts/AnnoucementContext";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress } from "@mui/material";

const AnnouncemensContainer = ({ anchorEl, open, onClose }) => {
  const [opend, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { annoucements } = useContext(AnnoucementContext);
  const { fetchedData, fetchData, loading, error } = useFetch();
  const { accessToken } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          `/api/annoucements/download/${fetchedData.id}`,
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
      let filename = `${fetchedData.title}.pdf`;

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

  const showAnnoucement = (annoucementId) => {
    setOpen(true);

    fetchData(
      import.meta.env.VITE_API_URL + `/api/annoucements/user/${annoucementId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            className:
              " !bg-light-gray dark:!bg-deep-green dark:!text-white rounded-lg shadow-lg",
            sx: {
              width: anchorEl?.offsetWidth, // širina parent diva
            },
          },
          list: {
            className: "p-700 ",
          },
        }}
      >
        {annoucements
          ? annoucements.map((annoucement) => (
              <MenuItem className="hover:!bg-transparent" key={annoucement.annoucementId} onClick={onClose}>
                <AnnouncementButton
                  annoucement={annoucement}
                  showAnnoucement={showAnnoucement}
                />
              </MenuItem>
            ))
          : null}
      </Menu>

      <Dialog
        open={opend}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 ">
          {loading && (
            <div className="flex flex-col items-center justify-center h-50 w-130 gap-y-3">
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
              <div className="p-8">
                <h3 className="text-center text-2xl mt-1 mb-4 text-black dark:text-white">
                  {fetchedData.title}
                </h3>
                <p className="text-black dark:text-white my-5">
                  {fetchedData.description}
                </p>
                <button
                  className="block bg-menu-button-light dark:bg-button-dark-green text-white p-3 rounded-lg mx-auto cursor-pointer"
                  onClick={handleDownload}
                >
                  {fetchedData.title}.pdf
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
