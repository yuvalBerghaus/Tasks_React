import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    id: 0,
    title: "",
    content: "",
    checked: false,
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      id: note.id + 1,
      title: "",
      content: "",
      checked: false,
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        {/* <p>{props.checked ? Status.COMPLETED : Status.INCOMPLETE}</p> */}
        <Checkbox
          name="checked"
          {...label}
          checked={note.checked}
          onChange={handleChange}
        />
        <Tooltip title="Add">
          <Zoom in={isExpanded}>
            <Fab color="primary" aria-label="add" onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </Tooltip>
      </form>
    </div>
  );
}

export default CreateArea;
