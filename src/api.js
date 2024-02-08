// api.js
import { API_LINK, METHOD } from "./constants";

async function fetchData() {
  try {
    const response = await fetch(API_LINK);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function addNewNote(newNote) {
  try {
    const response = await fetch(API_LINK, {
      method: METHOD.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    if (!response.ok) {
      throw new Error("Failed to add note");
    }
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
}

async function updateNoteById(noteId, updatedNote) {
  try {
    const response = await fetch(`${API_LINK}/${noteId}`, {
      method: METHOD.PUT,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    console.log(response);
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}

async function deleteNoteById(noteId) {
  try {
    const response = await fetch(`${API_LINK}/${noteId}`, {
      method: METHOD.DELETE,
    });

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

export { fetchData, addNewNote, updateNoteById, deleteNoteById };
