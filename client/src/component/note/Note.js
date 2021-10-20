import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { MdNotificationImportant } from "react-icons/md";
import { BiNotepad, BiLockOpen } from "react-icons/bi";
import { BsVectorPen, BsFillBookFill } from "react-icons/bs";

const Note = ({ id, text, date, handleDeleteNote, updateNote }) => {
  const borderColor = (number) => {
    if (number < 2) {
      return "border-red-300";
    } else if (number < 4) {
      return "border-blue-300";
    } else if (number < 6) {
      return "border-green-300";
    } else if (number < 8) {
      return "border-indigo-300";
    } else {
      return "border-purple-300";
    }
  };

  const iconRandom = (number) => {
    if (number < 2) {
      return (
        <MdNotificationImportant
          className="delete-icon text-green-500 animate-pulse transition duration-50"
          size="1.3em"
        />
      );
    } else if (number < 4) {
      return (
        <IoIosPricetags
          className="delete-icon text-blue-500 animate-pulse transition duration-50"
          size="1.3em"
        />
      );
    } else if (number < 6) {
      return (
        <BiNotepad
          className="delete-icon text-red-500 animate-pulse transition duration-50"
          size="1.3em"
        />
      );
    } else if (number < 8) {
      return (
        <BiLockOpen
          className="delete-icon text-green-500 animate-pulse transition duration-50"
          size="1.3em"
        />
      );
    } else {
      return (
        <BsFillBookFill
          className="delete-icon text-purple-500 animate-pulse transition duration-50"
          size="1.3em"
        />
      );
    }
  };

  return (
    <div
      className={`note overflow-auto shadow-xl border-t-4 ${borderColor(
        Math.random() * 10
      )}`}
    >
      <div className="overflow-auto h-[150px] break-all m-2">{text}</div>
      <div className="note-footer">
        <small className="font-semibold">{date}</small>
        <span className="flex flex-row opacity-100 md:opacity-0 md:hover:opacity-100 transition ease-in-out duration-100">
          <BsVectorPen
            onClick={() => updateNote(id)}
            className="edit-icon mx-2"
            size="1.3em"
          />
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="delete-icon"
            size="1.3em"
          />
        </span>
        <div className="tag-wrapper flex flex-row">
          {iconRandom(Math.random() * 10)}
        </div>
      </div>
    </div>
  );
};

export default Note;
