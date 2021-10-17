import React from "react";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="header">
      <h1 className="text-2xl">Notes</h1>
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
