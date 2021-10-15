import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  note,
  setNote,
}) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
          key={note.id}
        />
      ))}
      <AddNote note={note} setNote={setNote} handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
