import React, { useContext } from "react";
import { Store } from "./StoreProvider";

const Task = ({ task, clickedEdit, setClickedEdit }) => {
  const { state, dispatch } = useContext(Store);

  const onDelete = async (task) => {
    let response = await fetch(
      `http://localhost:8081/api/todo/task/delete/${task.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      dispatch({
        type: "remove-task",
        payload: task,
      });
    }
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

  const onEdit = async (task) => {
    setClickedEdit({
      clicked: true,
      task: task,
    });
  };

  return (
    <div className="flex justify-around">
      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {task.message}
      </span>
      <input
        className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
        disabled={clickedEdit.clicked}
        onChange={(event) => onCheckbox(event, task)}
        type="checkbox"
        checked={task.done}
      />
      <button disabled={clickedEdit.clicked} onClick={() => onDelete(task)}>
        Delete
      </button>
      <button
        disabled={task.done || clickedEdit.clicked}
        onClick={() => onEdit(task)}
      >
        Edit
      </button>
    </div>
  );
};

export default Task;
