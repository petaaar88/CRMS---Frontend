import { useContext, useState } from "react";

import Badge from "@mui/material/Badge";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { AnnoucementContext } from "../contexts/AnnoucementContext";

const AnnouncementButton = ({ annoucement, showAnnoucement }) => {
  const { fetchData } = useFetch();
  const { accessToken } = useAuth();
  const { setAnnoucements } = useContext(AnnoucementContext);

  const handleClick = () => {
    showAnnoucement(annoucement.annoucementId);

    if (!annoucement.seen)
      setAnnoucements((prev) =>
        prev.map((item) =>
          item.annoucementId === annoucement.annoucementId
            ? { ...item, seen: true }
            : item
        )
      );
    fetchData(
      import.meta.env.VITE_API_URL +
        `/api/annoucements/user/${annoucement.annoucementId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={annoucement.seen}
      className="w-full"
    >
      <button
        className=" bg-transparent break-words whitespace-normal hover:bg-gray-100 hover:dark:bg-dark-green  border-green-500 darK:border-green-700 border-2 rounded-xl p-2  w-full cursor-pointer text-xs"
        onClick={handleClick}
      >
        {annoucement.title}
      </button>
    </Badge>
  );
};

export default AnnouncementButton;
