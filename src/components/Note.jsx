import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import { STATUS, LABEL, TASK_OBJ, WARNING } from "../constants";

function Note(props) {
  const { ID, TITLE, CONTENT, CHECKED, CREATED_AT } = TASK_OBJ;
  const [task, setTask] = useState({
    [ID]: props[ID],
    [TITLE]: props[TITLE],
    [CONTENT]: props[CONTENT],
    [CHECKED]: props[CHECKED],
    [CREATED_AT]: props[CREATED_AT],
  });

  const handleDelete = () => {
    const isConfirmed = window.confirm(WARNING.DELETE);

    if (isConfirmed) {
      props.onDelete(task[ID]);
    }
  };
  function handleChange(name, value) {
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  function validateAndUpdate(name, value) {
    // Validate not empty before updating
    if (value.trim() === "") {
      alert(`${name} cannot be empty.`);
      setTask((prevTask) => ({
        ...prevTask,
        [name]: props[TASK_OBJ[name]], // Revert to previous value
      }));
    } else {
      handleChange(name, value);
      props.onChange(task);
    }
  }

  function changeCheckBox() {
    const updatedTask = {
      ...task,
      [CHECKED]: !task[CHECKED],
    };

    setTask(updatedTask);
    props.onChange(updatedTask);
  }

  return (
    <div className="note">
      <h2
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(event) => validateAndUpdate(TITLE, event.target.textContent)}
      >
        {task[TITLE]}
      </h2>
      <p
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(event) => validateAndUpdate(CONTENT, event.target.textContent)}
      >
        {task[CONTENT]}
      </p>
      <Checkbox {...LABEL} checked={task[CHECKED]} onChange={changeCheckBox} />
      <p className="status">
        {task[CHECKED] ? STATUS.COMPLETED : STATUS.INCOMPLETE}
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
