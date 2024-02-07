import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { STATUS, LABEL, TASK_OBJ } from "../constants";
function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    [TASK_OBJ.ID]: props[TASK_OBJ.ID],
    [TASK_OBJ.TITLE]: "",
    [TASK_OBJ.CONTENT]: "",
    [TASK_OBJ.CHECKED]: false,
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
      [TASK_OBJ.ID]: props[TASK_OBJ.ID] + 1,
      [TASK_OBJ.TITLE]: "",
      [TASK_OBJ.CONTENT]: "",
      [TASK_OBJ.CHECKED]: false,
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
            name={TASK_OBJ.TITLE}
            onChange={handleChange}
            value={note[TASK_OBJ.TITLE]}
            placeholder="Title"
          />
        )}

        <textarea
          name={TASK_OBJ.CONTENT}
          onClick={expand}
          onChange={handleChange}
          value={note[TASK_OBJ.CONTENT]}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
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
