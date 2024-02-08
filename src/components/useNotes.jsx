// useNotes.js (Custom hook for handling notes-related functionality)
import { useState, useEffect, useCallback } from "react";
import { fetchData, addNewNote, updateNoteById, deleteNoteById } from "../api";
import { TASK_OBJ, SORT } from "../constants";

export function useNotes() {
  const { ASCENDING, DESCENDING } = SORT;
  const { ID, CREATED_AT, CHECKED, TITLE, CONTENT } = TASK_OBJ;

  const [notes, setNotes] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [sortOrder, setSortOrder] = useState(ASCENDING);
  const [sortedNotes, setSortedNotes] = useState([]);

  const fetchNotesData = useCallback(async () => {
    try {
      const todos = await fetchData();

      const formattedNotes = todos.map((todo) => ({
        [ID]: todo[ID],
        [TITLE]: todo[TITLE],
        [CONTENT]: todo[CONTENT],
        [CHECKED]: todo["completed"],
        [CREATED_AT]: new Date(todo[CREATED_AT]),
      }));

      const maxId = formattedNotes.reduce(
        (max, note) => Math.max(max, note[ID]),
        0
      );

      setNextId(maxId + 1);
      setNotes(formattedNotes);
      setSortedNotes(formattedNotes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [ID, TITLE, CONTENT, CHECKED, CREATED_AT]);

  const sortNotes = useCallback(() => {
    let sortedNotesCopy = [...notes];
    const sortFunctions = {
      [`${DESCENDING}_${ID}`]: (a, b) => b[ID] - a[ID],
      [`${ASCENDING}_${ID}`]: (a, b) => a[ID] - b[ID],
      [`${DESCENDING}_${CREATED_AT}`]: (a, b) => b[CREATED_AT] - a[CREATED_AT],
      [`${ASCENDING}_${CREATED_AT}`]: (a, b) => a[CREATED_AT] - b[CREATED_AT],
      [`${DESCENDING}_${CHECKED}`]: (a, b) => (b[CHECKED] ? 1 : -1),
      [`${ASCENDING}_${CHECKED}`]: (a, b) => (a[CHECKED] ? 1 : -1),
    };

    const comparisonFunction = sortFunctions[sortOrder];

    if (comparisonFunction) {
      sortedNotesCopy.sort(comparisonFunction);
      setSortedNotes(sortedNotesCopy);
    }
  }, [sortOrder, notes, ID, DESCENDING, ASCENDING, CREATED_AT, CHECKED]);

  const addNote = async (newNote) => {
    setNextId((prevId) => prevId + 1);
    newNote[ID] = nextId;
    newNote[CREATED_AT] = new Date();

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setSortedNotes((prevSortedNotes) => [...prevSortedNotes, newNote]);

    try {
      await addNewNote(newNote);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

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

  const deleteNote = useCallback(
    (id) => {
      const handleDelete = async () => {
        try {
          await deleteNoteById(id);
          setNotes((prevNotes) => prevNotes.filter((note) => note[ID] !== id));
        } catch (error) {
          console.error("Error deleting note:", error);
        }
      };

      handleDelete();
    },
    [ID]
  );

  useEffect(() => {
    fetchNotesData();
  }, [fetchNotesData]);

  useEffect(() => {
    sortNotes();
  }, [sortNotes]);

  const handleSortChange = useCallback((sortParams) => {
    setSortOrder(sortParams);
  }, []);

  return {
    notes,
    sortedNotes,
    addNote,
    updateNote,
    deleteNote,
    handleSortChange,
  };
}
