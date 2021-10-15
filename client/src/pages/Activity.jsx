import React from "react";
import "../style/activity.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import NotesList from "../component/note/NotesList";
import Search from "../component/note/Search";
import Header from "../component/note/Header";
import * as action from "../redux/action";

const Activity = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState(false);
  const [note, setNote] = useState(null);
  const [notes, setNotes] = useState([]);

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
  }, [status]);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("subject")));
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    setNote(newNote);
    setStatus(true);
  };

  const deleteNote = (id) => {
    const deleteToBackend = notes.filter((note) => note.id === id);
    console.log(deleteToBackend[0]);
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

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          note={note}
          setNote={setNote}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default Activity;
