// App.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import BasicSelect from "./BasicSelect";
import { useNotes } from "./useNotes";
import { TASK_OBJ } from "../constants";

function App() {
  const { sortedNotes, addNote, updateNote, deleteNote, handleSortChange } =
    useNotes();
  const { ID } = TASK_OBJ;
  return (
    <div className="container">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="basic_select">
        <BasicSelect OnSortChange={handleSortChange} />
      </div>
      {sortedNotes.map((noteItem) => (
        <Note
          key={noteItem[ID]}
          id={noteItem[ID]}
          {...noteItem}
          onDelete={deleteNote}
          onChange={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
