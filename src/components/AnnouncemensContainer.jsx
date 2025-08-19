import { useState, useRef, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AnnouncementButton from "./AnnouncementButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from "../contexts/ThemeContext";

const AnnouncemensContainer = ({ anchorEl, open, onClose }) => {
  const [opend, setOpen] = useState(false);
    const {theme} = useContext(ThemeContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <MenuItem className="hover:!bg-transparent" onClick={onClose}>
          <AnnouncementButton isMarked={true} />
        </MenuItem>
        <MenuItem className="hover:!bg-transparent" onClick={onClose}>
          <AnnouncementButton isMarked={false} />
        </MenuItem>
        <MenuItem className="hover:!bg-transparent" onClick={onClose}>
          <AnnouncementButton isMarked={true} />
        </MenuItem>
      </Menu>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={opend}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 ">
          <button onClick={handleClose} className="absolute top-5 right-6 cursor-pointer"><CloseIcon fontSize="large" sx={{ color: theme === "dark" ? "white" :"black" }}/></button>
          <h3 className="text-center text-2xl mt-1 mb-4 text-black dark:text-white">Announcement</h3>
          <p className="text-black dark:text-white my-5">
            Ovo obavestenje odnosi se na novosti u nacinu poslovanja nase firme.
            Molimo da svi zaposleni procitaju.
          </p>
            <button className="block bg-menu-button-light dark:bg-button-dark-green text-white p-3 rounded-lg mx-auto cursor-pointer" onClick={handleClose}>annoucement.docx</button>
          
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnnouncemensContainer;
