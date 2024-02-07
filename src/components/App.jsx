import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { API_LINK, TASK_OBJ, METHOD } from "../constants";
function App() {
  const [notes, setNotes] = useState([]);
  const [next_id, setIdCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_LINK);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const todos = await response.json();

        const formattedNotes = todos.map((todo) => ({
          [TASK_OBJ.ID]: todo[TASK_OBJ.ID],
          [TASK_OBJ.TITLE]: todo[TASK_OBJ.TITLE],
          [TASK_OBJ.CONTENT]: todo[TASK_OBJ.TITLE],
          [TASK_OBJ.CHECKED]: todo[TASK_OBJ.CHECKED],
        }));
        // Find the maximum id using reduce
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
    fetchData();
  }, []);

  function addNote(newNote) {
    setNotes((notes) => {
      return [...notes, newNote];
    });
  }

  const updateNote = async (_note) => {
    try {
      // Create a new array with the updated note
      const updatedNotes = notes.map((note) =>
        note[TASK_OBJ.ID] === _note[TASK_OBJ.ID] ? _note : note
      );

      // Set the state with the new array
      setNotes(updatedNotes);

      // Make the API request to update the note
      const response = await fetch(`${API_LINK}/${_note[TASK_OBJ.ID]}`, {
        method: METHOD.PUT,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_note),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  function deleteNote(id) {
    // Assuming you have an async function to handle the DELETE request
    const handleDelete = async () => {
      try {
        const response = await fetch(`${API_LINK}/${id}`, {
          method: METHOD.DELETE,
        });

        if (!response.ok) {
          throw new Error("Failed to delete note");
        }
        // If the request is successful, update the state
        setNotes((notes) => notes.filter((card) => card[TASK_OBJ.ID] !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    };

    // Call the async function to send the DELETE request
    handleDelete();
  }
  return (
    <div className="container">
      <Header />
      <CreateArea onAdd={addNote} {...{ [TASK_OBJ.ID]: next_id }} />
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
