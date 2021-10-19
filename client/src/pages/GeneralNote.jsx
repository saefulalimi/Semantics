import { useEffect, useState } from "react";
import React from "react";
import uuid from "react-uuid";
import "../style/generalnote.css";
import Main from "../component/generalnote/Main";
import Sidebar from "../component/generalnote/Sidebar";
import ButtonActiveGN from "../component/navbar/ButtonActiveGN";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="md:flex md:flex-row md:max-h-screen">
      <div className="md:hidden flex justify-end fixed inset-0 overflow-y-auto transition ease-in-out duration-300 mt-4 mr-2">
        <ButtonActiveGN
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
      </div>
      <div className="hidden left md:block md:w-1/4">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
      </div>
      <div className="w-full right md:w-full md:mx-8 md:my-5 md:flex-1">
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </div>
  );
}

export default App;
