import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Header() {
  const { darkMode, setDarkMode } = useContext(AppContext);
  return (
    <header
      className={`py-4   drop-shadow-md fixed top-0 inset-x-0
    flex items-center
    ${darkMode ? "bg-black text-[#f0f0f0] border-b-[1px] border-b-gray-400" : "bg-white border-b-2 border-b-gray-300"}`}
    >
      <h1 className="font-bold text-3xl uppercase text-center flex-grow">
         Blogs Duniya
      </h1>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="mr-5 cursor-pointer"
      >
        {darkMode ? (
          <IoMdSunny fontSize="40px" className="text-yellow-500" />
        ) : (
          <IoMoon fontSize="40px" />
        )}
      </button>
    </header>
  );
}
