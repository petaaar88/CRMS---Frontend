import useTheme from "../hooks/useTheme";

import MoonImage from "../assets/moon.png"
import SunImage from "../assets/sun.png"

const ThemeButton = () => {
  const [theme, changeTheme] = useTheme();

  return (
    <button
      className="cursor-pointer outline-0 border-0 rounded-lg p-1 hover:bg-emerald-400 dark:hover:bg-emerald-800"
      onClick={changeTheme}
    >
      <img
        src={theme === "dark" ? MoonImage : SunImage}
        className="h-8"
        alt="Button for toggling theme"
      />
    </button>
  );
};

export default ThemeButton;
