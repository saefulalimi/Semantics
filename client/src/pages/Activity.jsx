import React from "react";
import "../style/activity.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import NotesList from "../component/note/NotesList";
import Search from "../component/note/Search";
import Header from "../component/note/Header";
import * as action from "../redux/action";
import MobileNavbar from "../component/navbar/mobile/MobileNavbar";

const Activity = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState(false);
  const [note, setNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (status) {
      const data = {
        token,
        data: note,
      };
      async function createNote() {
        await dispatch(action.addNote(data));
        const latest = JSON.parse(localStorage.getItem("subject"));
        setNotes(latest);
      }
      createNote();
      setNote(null);
      setStatus(false);
    }
  }, [status, dispatch, token, note]);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("subject")));
  }, []);

  const addNote = ({ id, text, date }) => {
    if (id) {
      const updateNote = {
        id: id,
        text: text,
        date: date,
      };
      async function updatePartial() {
        const data = {
          token,
          data: updateNote,
        };
        await dispatch(action.updateNote(data));
        const latest = JSON.parse(localStorage.getItem("subject"));
        setNotes(latest);
      }
      updatePartial();
    } else {
      const date = new Date();
      const newNote = {
        id: nanoid(),
        text: text,
        date: date.toLocaleDateString(),
      };
      setNote(newNote);
      setStatus(true);
    }
  };

  const deleteNote = (id) => {
    const deleteToBackend = notes.filter((note) => note.id === id);
    const data = {
      token,
      data: deleteToBackend[0],
    };
    async function deleteNote() {
      await dispatch(action.deleteNote(data));
      const latest = JSON.parse(localStorage.getItem("subject"));
      setNotes(latest);
    }
    deleteNote();
  };

  const updateNote = (id) => {
    const UpdateToBackend = notes.filter((note) => note.id === id);
    setEditNote(UpdateToBackend[0]);
  };

  return (
    <div className={`w-full h-auto ${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          editNote={editNote}
          setEditNote={setEditNote}
          note={note}
          setNote={setNote}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          updateNote={updateNote}
        />
      </div>
      <div className="mobileNav">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Activity;
