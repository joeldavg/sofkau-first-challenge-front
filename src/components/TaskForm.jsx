import React, { useContext, useRef, useState } from "react";
import { Store } from "./StoreProvider";

const TaskForm = ({ categoryId }) => {
  //
  const { state, dispatch } = useContext(Store);
  const formRef = useRef("");
  //
  const onAddTask = (event) => {
    event.preventDefault();
    if (message) {
      dispatch({
        type: "add-task",
        payload: { message, categoryId },
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
