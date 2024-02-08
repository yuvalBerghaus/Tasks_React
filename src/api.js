import { API_LINK, METHOD } from "./constants";

async function fetchData() {
  try {
    const response = await fetch(API_LINK);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
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
      throw new Error(`Failed to add note. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error adding note:", error.message);
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
      throw new Error(`Failed to update note. Status: ${response.status}`);
    }
    console.log(response);
  } catch (error) {
    console.error("Error updating note:", error.message);
    throw error;
  }
}

async function deleteNoteById(noteId) {
  try {
    const response = await fetch(`${API_LINK}/${noteId}`, {
      method: METHOD.DELETE,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete note. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting note:", error.message);
    throw error;
  }
}

export { fetchData, addNewNote, updateNoteById, deleteNoteById };
