// App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { fetchData, addNewNote, updateNoteById, deleteNoteById } from "../api";
import { TASK_OBJ } from "../constants";
import { Task } from "@mui/icons-material";

function App() {
  const [notes, setNotes] = useState([]);
  const [next_id, setIdCounter] = useState(0);

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const todos = await fetchData();

        const formattedNotes = todos.map((todo) => ({
          [TASK_OBJ.ID]: todo[TASK_OBJ.ID],
          [TASK_OBJ.TITLE]: todo[TASK_OBJ.TITLE],
          [TASK_OBJ.CONTENT]: todo[TASK_OBJ.TITLE],
          [TASK_OBJ.CHECKED]: todo["completed"],
        }));

        const maxId = formattedNotes.reduce(
          (max, note) => Math.max(max, note[TASK_OBJ.ID]),
          0
        );
        setIdCounter(maxId + 1);
        setNotes(formattedNotes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNotesData();
  }, []);

  function addNote(newNote) {
    setIdCounter((prevId) => prevId + 1);
    newNote[TASK_OBJ.ID] = next_id;

    console.log("New Note:", newNote);

    setNotes((prevNotes) => [...prevNotes, newNote]);

    const postNewNote = async () => {
      try {
        await addNewNote(newNote);
      } catch (error) {
        console.error("Error adding note:", error);
      }
    };

    postNewNote();
  }

  const updateNote = async (_note) => {
    try {
      const updatedNotes = notes.map((note) =>
        note[TASK_OBJ.ID] === _note[TASK_OBJ.ID] ? _note : note
      );

      setNotes(updatedNotes);

      await updateNoteById(_note[TASK_OBJ.ID], _note);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  function deleteNote(id) {
    const handleDelete = async () => {
      try {
        await deleteNoteById(id);
        setNotes((notes) => notes.filter((card) => card[TASK_OBJ.ID] !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    };

    handleDelete();
  }

  return (
    <div className="container">
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem[TASK_OBJ.ID]}
          id={noteItem[TASK_OBJ.ID]}
          {...{
            [TASK_OBJ.TITLE]: noteItem[TASK_OBJ.TITLE],
            [TASK_OBJ.CONTENT]: noteItem[TASK_OBJ.CONTENT],
            [TASK_OBJ.CHECKED]: noteItem[TASK_OBJ.CHECKED],
          }}
          onDelete={deleteNote}
          onChange={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
