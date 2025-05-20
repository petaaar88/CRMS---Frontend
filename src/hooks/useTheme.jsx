import { useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    document.querySelector("html").dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);

    setTheme(newTheme);
  };

  return [theme, changeTheme];
};

export default useTheme;
