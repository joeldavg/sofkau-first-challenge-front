import React, { useContext, useRef, useState } from "react";
import { Store } from "../state/StoreProvider";

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
    <div className="flex flex-col items-center">
      <h1 className="text-center text-4xl font-medium text-blue-900">
        Dashboard
      </h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center"
        ref={formRef}
      >
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          disabled={clickedEdit.clicked}
          onChange={addingTitle}
          type="text"
          name="title"
          placeholder="TO-DO Category"
        />
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          disabled={clickedEdit.clicked}
          onClick={onAddCategory}
        >
          New Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
