import React, { useContext, useRef, useState } from "react";
import { Store } from "./StoreProvider";

const CategoryForm = ({ clickedEdit }) => {
  const { state, dispatch } = useContext(Store);

  const formRef = useRef(null);
  //
  const onAddCategory = async (event) => {
    event.preventDefault();

    if (title) {
      let categorySaved = await fetch(
        `http://localhost:8081/api/todo/category/save`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title }),
        }
      );
      dispatch({
        type: "add-category",
        payload: await categorySaved.json(),
      });
    }
    setTitle("");
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
          disabled={clickedEdit.clicked}
          onChange={addingTitle}
          type="text"
          name="title"
          placeholder="TO-DO Category"
        />
        <button disabled={clickedEdit.clicked} onClick={onAddCategory}>
          New Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
