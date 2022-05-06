import React, { useContext, useRef, useState } from "react";
import { Store } from "./StoreProvider";

const TaskForm = ({ categoryId }) => {
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

  return (
    <form ref={formRef}>
      <input
        onChange={addingMessage}
        type="text"
        name="message"
        placeholder="¿What would like to do?"
      />
      <button onClick={onAddTask}>Add</button>
    </form>
  );
};

export default TaskForm;
