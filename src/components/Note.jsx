import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import { status, label } from "../constants";
function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleChange() {
    props.onChange(props.id);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Checkbox {...label} checked={props.checked} onChange={handleChange} />
      <p className="status">
        {props.checked ? status.COMPLETED : status.INCOMPLETE}
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
