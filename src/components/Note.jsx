import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import { status, label } from "../constants";
function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleChange(task) {
    props.onChange(task);
  }
  function changeCheckBox() {
    setTask((task) => ({
      ...task,
      checked: !task.checked,
    }));
    handleChange(task);
  }
  const [task, setTask] = useState({
    id: props.id,
    title: props.title,
    content: props.content,
    checked: !props.checked,
  });

  return (
    <div className="note">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <Checkbox {...label} checked={props.checked} onChange={changeCheckBox} />
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
