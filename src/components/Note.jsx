import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import { STATUS, LABEL, TASK_OBJ, WARNING } from "../constants";

function Note(props) {
  const [task, setTask] = useState({
    [TASK_OBJ.ID]: props[TASK_OBJ.ID],
    [TASK_OBJ.TITLE]: props[TASK_OBJ.TITLE],
    [TASK_OBJ.CONTENT]: props[TASK_OBJ.CONTENT],
    [TASK_OBJ.CHECKED]: props[TASK_OBJ.CHECKED],
    [TASK_OBJ.CREATED_AT]: props[TASK_OBJ.CREATED_AT],
  });

  const handleDelete = () => {
    const isConfirmed = window.confirm(WARNING.DELETE);

    if (isConfirmed) {
      props.onDelete(task[TASK_OBJ.ID]);
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
      [TASK_OBJ.CHECKED]: !task[TASK_OBJ.CHECKED],
    };

    setTask(updatedTask);
    props.onChange(updatedTask);
  }

  return (
    <div className="note">
      <h2
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(event) =>
          validateAndUpdate(TASK_OBJ.TITLE, event.target.textContent)
        }
      >
        {task[TASK_OBJ.TITLE]}
      </h2>
      <p
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(event) =>
          validateAndUpdate(TASK_OBJ.CONTENT, event.target.textContent)
        }
      >
        {task[TASK_OBJ.CONTENT]}
      </p>
      <Checkbox
        {...LABEL}
        checked={task[TASK_OBJ.CHECKED]}
        onChange={changeCheckBox}
      />
      <p className="status">
        {task[TASK_OBJ.CHECKED] ? STATUS.COMPLETED : STATUS.INCOMPLETE}
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
