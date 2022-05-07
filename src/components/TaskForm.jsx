import React, { useContext, useRef, useState } from "react";
import { Store } from "./StoreProvider";

const TaskForm = ({ categoryId, clickedEdit, setClickedEdit }) => {
  //
  const { state, dispatch } = useContext(Store);
  const formRef = useRef("");
  //
  const onAddTask = async (event) => {
    event.preventDefault();
    if (message) {
      let newTask = {
        message: message,
        done: false,
        categoryId: categoryId,
      };
      let taskSaved = await fetch(`http://localhost:8081/api/todo/task/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      dispatch({
        type: "add-task",
        payload: await taskSaved.json(),
      });
    }

    setMessage("");
    formRef.current.reset();
  };

  const [message, setMessage] = useState("");

  const addingMessage = (event) => {
    setMessage(event.target.value);
  };

  const onUpdateTask = async (event) => {
    event.preventDefault();
    if (message) {
      let updatedTask = {
        ...task,
        message: message,
      };
      let taskUpdated = await fetch(
        `http://localhost:8081/api/todo/task/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );
      dispatch({
        type: "update-task",
        payload: await taskUpdated.json(),
      });
    }
    setClickedEdit({
      clicked: false,
      task: {},
    });
    setMessage("");
    formRef.current.reset();
  };

  let { clicked, task } = { ...clickedEdit };
  return (
    <form ref={formRef}>
      {!clicked ? (
        <div className="flex justify-around gap-x-5">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            onChange={addingMessage}
            type="text"
            name="message"
            placeholder="¿What would like to do?"
          />
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={onAddTask}
          >
            Add
          </button>
        </div>
      ) : (
        <>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            onChange={addingMessage}
            type="text"
            name="message"
            placeholder="Add new message"
          />
          <button onClick={onUpdateTask}>Update</button>
        </>
      )}
    </form>
  );
};

export default TaskForm;
