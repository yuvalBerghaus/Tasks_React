import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

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
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  const updateNote = async (id) => {
    try {
      setNotes((prevNotes) =>
        prevNotes.map((card) => {
          if (card.id === id) {
            console.log("card.id " + card.id);
            console.log("id " + id);
            return {
              ...card,
              checked: !card.checked,
            };
          }
          return card;
        })
      );
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes.at(id)), // Adjust the body as needed
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((card) => card.id !== id);
    });
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
