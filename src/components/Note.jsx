import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import { STATUS, LABEL, TASK_OBJ } from "../constants";
function Note(props) {
  function handleDelete() {
    props.onDelete(props[TASK_OBJ.ID]);
  }

  function handleChange(task) {
    props.onChange(task);
  }
  function changeCheckBox() {
    setTask((prevTask) => {
      const updatedTask = {
        ...prevTask,
        [TASK_OBJ.CHECKED]: !prevTask[TASK_OBJ.CHECKED],
      };
      handleChange(updatedTask);
      return updatedTask;
    });
  }
  const [task, setTask] = useState({
    [TASK_OBJ.ID]: props[TASK_OBJ.ID],
    [TASK_OBJ.TITLE]: props[TASK_OBJ.TITLE],
    [TASK_OBJ.CONTENT]: props[TASK_OBJ.CONTENT],
    [TASK_OBJ.CHECKED]: !props[TASK_OBJ.CHECKED],
  });

  return (
    <div className="note">
      <h2>{task[TASK_OBJ.TITLE]}</h2>
      <p>{task[TASK_OBJ.CONTENT]}</p>
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
