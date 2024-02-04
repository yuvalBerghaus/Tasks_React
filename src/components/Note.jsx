import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import Status from "../constants";
function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleChange() {
    props.onChange(props.id);
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="note">
      <h1 contentEditable>{props.title}</h1>
      <p contentEditable>{props.content}</p>
      <Checkbox {...label} checked={props.checked} onChange={handleChange} />
      <p className="status">
        {props.checked ? Status.COMPLETED : Status.INCOMPLETE}
      </p>
      <Tooltip title="Delete">
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Note;
