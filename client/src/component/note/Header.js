import React from "react";
import { Link } from "react-router-dom";
import { BsBackspaceFill } from "react-icons/bs";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="header">
      <Link to="/dashboard">
        <BsBackspaceFill
          className="hidden md:block my-3 text-black hover:cursor-pointer"
          size="1.8rem"
        />
      </Link>
      <h1 className="text-2xl md:font-bold">Important Notes</h1>
      <button
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        className="save px-3 py-2 rounded-lg my-3 hover:bg-green-400 hover:text-black"
      >
        Toggle Mode
      </button>
    </div>
  );
};

export default Header;
