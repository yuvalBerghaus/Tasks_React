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
  //TODO - HandleChange
  function handleChange() {
    console.log("id in notes is " + props.id);
    props.onChange(props.id);
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="note">
      <h1 contentEditable>{props.title}</h1>
      <p contentEditable>{props.content}</p>
      {props.checked ? <p>{Status.COMPLETED}</p> : <p>{Status.INCOMPLETE}</p>}
      <Checkbox {...label} checked={props.checked} onChange={handleChange} />
      <Tooltip title="Delete">
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Note;
