import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { MdNotificationImportant } from "react-icons/md";
import { BiNotepad } from "react-icons/bi";
import { BsVectorPen } from "react-icons/bs";
import Flippy, { FrontSide, BackSide } from "react-flippy";

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

  return (
    <Flippy flipOnClick={true}>
      <FrontSide
        style={{
          padding: "0",
          borderRadius: "20px",
          height: "97%",
        }}
      >
        <div
          className={`note shadow-xl border-t-4 ${borderColor(
            Math.random() * 10
          )}`}
        >
          <span>{text}</span>
          <div className="note-footer">
            <small className="font-bold">{date}</small>
            <span className="flex flex-row">
              <BsVectorPen
                onClick={() => updateNote(id)}
                className="edit-icon"
                size="1.3em"
              />
              <MdDeleteForever
                onClick={() => handleDeleteNote(id)}
                className="delete-icon"
                size="1.3em"
              />
            </span>
            <div className="tag-wrapper flex flex-row">
              <IoIosPricetags className="delete-icon" size="1.3em" />
              <BiNotepad className="delete-icon" size="1.3em" />
              <MdNotificationImportant className="delete-icon" size="1.3em" />
            </div>
          </div>
        </div>
      </FrontSide>
      <BackSide
        style={{
          borderRadius: "20px",
          height: "97%",
        }}
      >
        <h2>Haloo kawann</h2>
      </BackSide>
    </Flippy>
  );
};

export default Note;
