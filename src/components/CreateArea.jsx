import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { STATUS, LABEL, TASK_OBJ, WARNING, TASK_INIT_OBJ } from "../constants";

function CreateArea(props) {
  const { TITLE, CONTENT, CHECKED } = TASK_OBJ;
  const { EMPTY } = WARNING;
  const { COMPLETED, INCOMPLETE } = STATUS;
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState(TASK_INIT_OBJ);

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
    if (validateForm()) {
      props.onAdd(note);
      setNote(TASK_INIT_OBJ);
    }
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  function validateForm() {
    if (note[TITLE].trim() === "" || note[CONTENT].trim() === "") {
      alert(EMPTY);
      return false;
    }
    return true;
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name={TITLE}
            onChange={handleChange}
            value={note[TITLE]}
            placeholder="Title"
            required
          />
        )}

        <textarea
          name={CONTENT}
          onClick={expand}
          onChange={handleChange}
          value={note[CONTENT]}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checked"
              {...LABEL}
              checked={note[CHECKED] || false}
              onChange={handleChange}
            />
          }
          label={note[CHECKED] ? COMPLETED : INCOMPLETE}
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
