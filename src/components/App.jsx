import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { api_link } from "../constants";
function App() {
  const [notes, setNotes] = useState([]);
  const [next_id, setIdCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const todos = await response.json();

        const formattedNotes = todos.map((todo) => ({
          id: todo.id,
          title: todo.title,
          content: todo.title,
          checked: todo.completed,
        }));
        // Find the maximum id using reduce
        const maxId = formattedNotes.reduce(
          (max, note) => Math.max(max, note.id),
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
        note.id === _note.id ? _note : note
      );

      // Set the state with the new array
      setNotes(updatedNotes);

      // Make the API request to update the note
      const response = await fetch(`${api_link}/${_note.id}`, {
        method: "PUT",
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
        const response = await fetch(`${api_link}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete note");
        }
        // If the request is successful, update the state
        setNotes((notes) => notes.filter((card) => card.id !== id));
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
      <CreateArea onAdd={addNote} next_id={next_id} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          checked={noteItem.checked}
          onDelete={deleteNote}
          onChange={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
