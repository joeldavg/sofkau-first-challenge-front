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

  const onCheckbox = async (event, task) => {
    const checked = event.currentTarget.checked;
    const taskUpdated = { ...task, done: checked };
    let taskUpdatedPromise = await fetch(
      `http://localhost:8081/api/todo/task/update`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskUpdated),
      }
    );
    dispatch({
      type: "update-task",
      payload: await taskUpdatedPromise.json(),
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
