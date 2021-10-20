import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  note,
  setNote,
  updateNote,
  editNote,
  setEditNote,
}) => {
  return (
    <div className="notes-list h-full py-3">
      <AddNote
        note={note}
        setNote={setNote}
        editNote={editNote}
        setEditNote={setEditNote}
        handleAddNote={handleAddNote}
      />
      {notes.map((note) => (
        <Note
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
          key={note.id}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
