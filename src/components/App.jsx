import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((notes) => {
      return [...notes, newNote];
    });
  }
  function updateNote(id) {
    console.log("id in App is " + id);
    setNotes((notes) => {
      return notes.map((card) => {
        console.log(card);
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
    setNotes((notes) => {
      return notes.filter((card) => card.id !== id);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            checked={noteItem.checked}
            onDelete={deleteNote}
            onChange={updateNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
