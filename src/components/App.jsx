// App.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotesContainer from "./NotesContainer";

function App() {
  return (
    <div className="container">
      <Header />
      <NotesContainer />
      <Footer />
    </div>
  );
}

export default App;
