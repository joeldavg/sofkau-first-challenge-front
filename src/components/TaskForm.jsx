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
        <>
          <input
            onChange={addingMessage}
            type="text"
            name="message"
            placeholder="¿What would like to do?"
          />
          <button onClick={onAddTask}>Add</button>
        </>
      ) : (
        <>
          <input
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
