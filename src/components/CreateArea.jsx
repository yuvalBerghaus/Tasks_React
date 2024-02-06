import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { status, label } from "../constants";
function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    id: props.next_id,
    title: "",
    content: "",
    checked: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setNote((note) => {
      return {
        ...note,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      id: props.next_id + 1,
      title: "",
      content: "",
      checked: false,
    });
    console.log("updated note id for createarea is " + props.next_id);
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
        <FormControlLabel
          control={
            <Checkbox
              name="checked"
              {...label}
              checked={note.checked}
              onChange={handleChange}
            />
          }
          label={note.checked ? status.COMPLETED : status.INCOMPLETE}
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
