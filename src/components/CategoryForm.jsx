import React, { useContext, useRef, useState } from "react";
import { Store } from "./StoreProvider";

const CategoryForm = () => {
  const { state, dispatch } = useContext(Store);

  const formRef = useRef(null);
  const onAdd = (event) => {
    event.preventDefault();
    if (title) {
      dispatch({
        type: "add-category",
        payload: { title },
      });
    }

    formRef.current.reset();
  };

  const [title, setTitle] = useState("");

  const addingTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form ref={formRef}>
        <input
          onChange={addingTitle}
          type="text"
          name="title"
          placeholder="TO-DO Category"
        />
        <button onClick={onAdd}>New Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
