import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { STATUS, LABEL, TASK_OBJ, WARNING } from "../constants";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    [TASK_OBJ.TITLE]: "",
    [TASK_OBJ.CONTENT]: "",
    [TASK_OBJ.CHECKED]: false,
    [TASK_OBJ.CREATED_AT]: null,
  });

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
      setNote({
        [TASK_OBJ.TITLE]: "",
        [TASK_OBJ.CONTENT]: "",
        [TASK_OBJ.CHECKED]: false,
        [TASK_OBJ.CREATED_AT]: null,
      });
    }
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  function validateForm() {
    if (
      note[TASK_OBJ.TITLE].trim() === "" ||
      note[TASK_OBJ.CONTENT].trim() === ""
    ) {
      alert(WARNING.EMPTY);
      return false;
    }
    return true;
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name={TASK_OBJ.TITLE}
            onChange={handleChange}
            value={note[TASK_OBJ.TITLE]}
            placeholder="Title"
            required
          />
        )}

        <textarea
          name={TASK_OBJ.CONTENT}
          onClick={expand}
          onChange={handleChange}
          value={note[TASK_OBJ.CONTENT]}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checked"
              {...LABEL}
              checked={note[TASK_OBJ.CHECKED] || false}
              onChange={handleChange}
            />
          }
          label={note[TASK_OBJ.CHECKED] ? STATUS.COMPLETED : STATUS.INCOMPLETE}
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
