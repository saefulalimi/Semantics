import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";

const ButtonActiveGN = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const [nav, setNav] = useState("hidden");

  function navAction() {
    nav === "hidden" ? setNav("block") : setNav("hidden");
  }

  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            onClick={navAction}
          >
            Show List
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${nav} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div
            className="flex flex-row justify-start items-center my-2 mx-3 text-sm font-semibold"
            onClick={onAddNote}
          >
            <MdAddBox className="h-5 w-5" />
            <span>Create New Note</span>
          </div>
          {sortedNotes.map(({ id, title }, i) => (
            //start
            <div>
              <div>
                <div
                  key={id}
                  className={`${id === activeNote && "active"}`}
                  onClick={() => setActiveNote(id)}
                >
                  <div
                    className="flex flex-row justify-between items-center text-gray-700 text-sm font-semibold my-2 mx-3"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    {title && title.substr(0, 15) + "..."}
                    <BsTrash onClick={(e) => onDeleteNote(id)} />
                  </div>
                </div>
              </div>
            </div>

            // <div
            //   className={`app-sidebar-note border-t-2 border-black ${
            //     id === activeNote && "active"
            //   }`}
            //   key={id}
            //   onClick={() => setActiveNote(id)}
            // >
            //   <div className="sidebar-note-title">
            //     <strong>Title : {title && title.substr(0, 20) + "..."}</strong>
            //     <button onClick={(e) => onDeleteNote(id)}>
            //       <BsTrash />
            //     </button>
            //   </div>

            //   <p>{body && body.substr(0, 20) + "..."}</p>
            //   <small className="note-meta">
            //     Last Modified{" "}
            //     {new Date(lastModified).toLocaleDateString("en-GB", {
            //       hour: "2-digit",
            //       minute: "2-digit",
            //     })}
            //   </small>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonActiveGN;
