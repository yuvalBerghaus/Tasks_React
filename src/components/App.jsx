// App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { fetchData, addNewNote, updateNoteById, deleteNoteById } from "../api";
import { SORT, TASK_OBJ } from "../constants";
import BasicSelect from "./BasicSelect";
function App() {
  const [notes, setNotes] = useState([]);
  const [next_id, setIdCounter] = useState(0);
  const [sortOrder, setSortOrder] = useState(SORT.ASCENDING); // 'asc' or 'desc'
  const [sortedNotes, setSortedNotes] = useState([]);
  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const todos = await fetchData();

        const formattedNotes = todos.map((todo) => ({
          [TASK_OBJ.ID]: todo[TASK_OBJ.ID],
          [TASK_OBJ.TITLE]: todo[TASK_OBJ.TITLE],
          [TASK_OBJ.CONTENT]: todo[TASK_OBJ.TITLE],
          [TASK_OBJ.CHECKED]: todo["completed"],
          [TASK_OBJ.CREATED_AT]: getCurrentDateMinusOneDay(),
        }));

        const maxId = formattedNotes.reduce(
          (max, note) => Math.max(max, note[TASK_OBJ.ID]),
          0
        );
        setIdCounter(maxId + 1);
        setNotes(formattedNotes);
        setSortedNotes(formattedNotes);
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
    setSortedNotes((prevSortedNotes) => [...prevSortedNotes, newNote]);

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

  useEffect(() => {
    // Sort the notes whenever sortOrder changes
    sortNotes();
  }, [sortOrder, notes]);

  const sortNotes = () => {
    const sorted = [...notes];

    if (sortOrder === SORT.ASCENDING) {
      sorted.sort(
        (a, b) =>
          new Date(a[TASK_OBJ.CREATED_AT]) - new Date(b[TASK_OBJ.CREATED_AT])
      );
    } else {
      sorted.sort(
        (a, b) =>
          new Date(b[TASK_OBJ.CREATED_AT]) - new Date(a[TASK_OBJ.CREATED_AT])
      );
    }

    setSortedNotes(sorted);
  };

  function getCurrentDateMinusOneDay() {
    const currentDate = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const currentDateMinusOneDay = new Date(
      currentDate.getTime() - oneDayInMilliseconds
    );

    return currentDateMinusOneDay;
  }

  return (
    <div className="container">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="basic_select">
        <BasicSelect />
      </div>
      {sortedNotes.map((noteItem) => (
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
