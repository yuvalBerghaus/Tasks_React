// NotesContainer.jsx
import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import BasicSelect from "./BasicSelect";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchData, addNewNote, updateNoteById, deleteNoteById } from "../api";
import { TASK_OBJ, SORT } from "../constants";

const { ID, TITLE, CONTENT, CHECKED, CREATED_AT } = TASK_OBJ;
const { ASCENDING, DESCENDING } = SORT;

function NotesContainer() {
  const [notes, setNotes] = useState([]);
  const [next_id, setIdCounter] = useState(0);
  const [sortOrder, setSortOrder] = useState(ASCENDING);
  const [sortedNotes, setSortedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchNotesData();
  }, []);

  function addNote(newNote) {
    setIdCounter((prevId) => prevId + 1);
    newNote[ID] = next_id;
    newNote[CREATED_AT] = new Date();

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
    sortNotes();
  }, [sortOrder, notes]);

  const sortNotes = () => {
    let sortedNotesCopy = [...notes];

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
    setSortOrder(sortParams);
  }

  return (
    <div>
      <CreateArea onAdd={addNote} />
      <div className="basic_select">
        <BasicSelect OnSortChange={handleSortChange} />
      </div>

      {loading ? (
        <div class="loading">
          <CircularProgress size="10rem" disableShrink />;
        </div>
      ) : (
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
    </div>
  );
}

export default NotesContainer;
