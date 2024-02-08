// App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { fetchData, addNewNote, updateNoteById, deleteNoteById } from "../api";
import { TASK_OBJ, SORT } from "../constants";
import BasicSelect from "./BasicSelect";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const { ASCENDING, DESCENDING } = SORT;
  const [notes, setNotes] = useState([]);
  const [next_id, setIdCounter] = useState(0);
  const [sortOrder, setSortOrder] = useState(ASCENDING); // 'asc' or 'desc'
  const [sortedNotes, setSortedNotes] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const { ID, TITLE, CONTENT, CHECKED, CREATED_AT } = TASK_OBJ;

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        setLoading(true); // Set loading state to true while fetching data
        const todos = await fetchData();

        const formattedNotes = todos.map((todo) => ({
          [ID]: todo[ID],
          [TITLE]: todo[TITLE],
          [CONTENT]: todo[CONTENT],
          [CHECKED]: todo["completed"],
          [CREATED_AT]: todo[CREATED_AT],
        }));
        const maxId = formattedNotes.reduce(
          (max, note) => Math.max(max, note[ID]),
          0
        );
        setIdCounter(maxId + 1);
        setNotes(formattedNotes);
        setSortedNotes(formattedNotes);
        setLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false in case of an error
      }
    };

    fetchNotesData();
  }, []);

  function addNote(newNote) {
    setIdCounter((prevId) => prevId + 1);
    newNote[ID] = next_id;

    // Corrected: Invoke new Date() to get the current date object
    newNote[CREATED_AT] = new Date();

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
        note[ID] === _note[ID] ? _note : note
      );

      setNotes(updatedNotes);

      await updateNoteById(_note[ID], _note);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  function deleteNote(id) {
    const handleDelete = async () => {
      try {
        await deleteNoteById(id);
        setNotes((notes) => notes.filter((card) => card[ID] !== id));
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
    let sortedNotesCopy = [...notes];
    // TODO
    switch (sortOrder) {
      case `${DESCENDING}_${ID}`:
        sortedNotesCopy.sort((a, b) => b[ID] - a[ID]);
        break;
      case `${ASCENDING}_${ID}`:
        sortedNotesCopy.sort((a, b) => a[ID] - b[ID]);
        break;
      case `${DESCENDING}_${CREATED_AT}`:
        sortedNotesCopy.sort(
          (a, b) => new Date(b[CREATED_AT]) - new Date(a[CREATED_AT])
        );
        break;
      case `${ASCENDING}_${CREATED_AT}`:
        sortedNotesCopy.sort(
          (a, b) => new Date(a[CREATED_AT]) - new Date(b[CREATED_AT])
        );
        break;
      case `${DESCENDING}_${CHECKED}`:
        sortedNotesCopy.sort((a, b) => (b[CHECKED] ? 1 : -1));
        break;
      case `${ASCENDING}_${CHECKED}`:
        sortedNotesCopy.sort((a, b) => (a[CHECKED] ? 1 : -1));
        break;
      default:
    }

    setSortedNotes(sortedNotesCopy);
  };

  function handleSortChange(sortParams) {
    console.log(sortParams);
    setSortOrder(sortParams);
  }

  return (
    <div className="container">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="basic_select">
        <BasicSelect OnSortChange={handleSortChange} />
      </div>

      {loading ? (
        // Loading UI

        <div class="loading">
          <CircularProgress size="10rem" disableShrink />;
        </div>
      ) : (
        // Actual content
        sortedNotes.map((noteItem) => (
          <Note
            key={noteItem[ID]}
            id={noteItem[ID]}
            {...{
              [TITLE]: noteItem[TITLE],
              [CONTENT]: noteItem[CONTENT],
              [CHECKED]: noteItem[CHECKED],
              [CREATED_AT]: noteItem[CREATED_AT],
            }}
            onDelete={deleteNote}
            onChange={updateNote}
          />
        ))
      )}

      <Footer />
    </div>
  );
}

export default App;
