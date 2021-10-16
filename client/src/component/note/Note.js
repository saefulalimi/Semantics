import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { MdNotificationImportant } from "react-icons/md";
import { GiFeather } from "react-icons/gi";
import { BsFillPenFill } from "react-icons/bs";

const Note = ({ id, text, date, handleDeleteNote, updateNote }) => {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <div className="tag-wrapper">
          <IoIosPricetags className="delete-icon" size="1.3em" />
          <GiFeather className="delete-icon" size="1.3em" />
          <MdNotificationImportant className="delete-icon" size="1.3em" />
        </div>
        <BsFillPenFill
          onClick={() => updateNote(id)}
          className="edit-icon"
          size="1em"
        />
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
