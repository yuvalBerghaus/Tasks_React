import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

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

  function updateNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((card) => {
        if (card.id === id) {
          const newState = !card.checked;
          return {
            ...card,
            checked: newState,
          };
        }
        return card;
      });
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((card) => card.id !== id);
    });
  }

  return (
    <div className="container">
      <Header />
      <CreateArea onAdd={addNote} />
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
