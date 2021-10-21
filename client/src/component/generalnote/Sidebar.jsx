import React from "react";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BsBackspaceFill } from "react-icons/bs";

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="md:w-full">
      <div className="app-sidebar-header">
        <Link to="/dashboard">
          <BsBackspaceFill
            className="hidden md:flex justify-center items-center my-3 text-white hover:cursor-pointer"
            size="1.8rem"
          />
        </Link>
        <h4>GENERAL NOTE</h4>
        <button onClick={onAddNote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z" />
          </svg>
        </button>
      </div>
      <div className="h-full overflow-auto md:max-h-screen">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note border-t-2 border-black ${
              id === activeNote && "active"
            }`}
            key={i}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>Title : {title && title.substr(0, 20) + "..."}</strong>
              <button onClick={(e) => onDeleteNote(id)}>
                <BsTrash />
              </button>
            </div>

            <p>{body && body.substr(0, 20) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
