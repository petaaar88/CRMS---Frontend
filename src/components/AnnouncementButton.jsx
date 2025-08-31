import { useContext, useState } from "react";

import Badge from "@mui/material/Badge";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { AnnouncementContext } from "../contexts/AnnouncementContext";

const AnnouncementButton = ({ announcement, showAnnouncement }) => {
  const { fetchData } = useFetch();
  const { accessToken } = useAuth();
  const { setAnnouncements } = useContext(AnnouncementContext);

  const handleClick = () => {
    showAnnouncement(announcement.announcementId);

    if (!announcement.seen)
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.announcementId === announcement.announcementId
            ? { ...item, seen: true }
            : item
        )
      );

    if (!announcement.seen)
      fetchData(
        import.meta.env.VITE_API_URL +
          `/api/announcements/user/${announcement.announcementId}`,
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
      invisible={announcement.seen}
      className="w-full"
    >
      <button
        className=" bg-transparent break-words whitespace-normal hover:bg-gray-100 hover:dark:bg-dark-green  border-green-500 darK:border-green-700 border-2 rounded-xl p-2  w-full cursor-pointer text-xs"
        onClick={handleClick}
      >
        {announcement.title}
      </button>
    </Badge>
  );
};

export default AnnouncementButton;
