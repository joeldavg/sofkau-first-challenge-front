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
    <tr>
      <td>
        <span
          className="text text-2xl font-bold text-black justify-start "
          style={task.done ? { textDecoration: "line-through" } : {}}
        >
          {task.message}
        </span>
      </td>
      <td>
        <input
          className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
          disabled={clickedEdit.clicked}
          onChange={(event) => onCheckbox(event, task)}
          type="checkbox"
          checked={task.done}
        />
      </td>
      <td>
        <button
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          disabled={clickedEdit.clicked}
          onClick={() => onDelete(task)}
        >
          Delete
        </button>
      </td>
      <td>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={task.done || clickedEdit.clicked}
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default Task;
