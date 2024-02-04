import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {/* <button onClick={handleClick}>
        <DeleteIcon />
      </button> */}
      <Tooltip title="Delete">
        <IconButton onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Note;
