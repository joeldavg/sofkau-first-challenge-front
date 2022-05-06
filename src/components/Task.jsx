import React, { useContext } from "react";
import { Store } from "./StoreProvider";

const Task = ({ task }) => {
  const { state, dispatch } = useContext(Store);

  const onDelete = (task) => {
    dispatch({
      type: "remove-task",
      payload: task,
    });
  };

  const onCheckbox = (event, task) => {
    const checked = event.currentTarget.checked;
    const taskUpdated = { ...task, done: checked };
    dispatch({
      type: "update-task",
      payload: taskUpdated,
    });
  };

  return (
    <li>
      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {task.message}
      </span>
      <input
        onChange={(event) => onCheckbox(event, task)}
        type="checkbox"
        checked={task.done}
      />
      <button onClick={() => onDelete(task)}>Delete</button>
      <button>Edit</button>
    </li>
  );
};

export default Task;
