import React, { useContext, useEffect, useState } from "react";
import { Store } from "../state/StoreProvider";
import ListOfTasks from "./ListOfTasks";
import TaskForm from "./TaskForm";

const ListOfCategories = ({ clickedEdit, setClickedEdit }) => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    let listOfCategories = fetchAllCategories().then((categories) => {
      dispatch({
        type: "get-categories",
        payload: categories,
      });
    });
  }, []);

  const fetchAllCategories = async () => {
    let response = await fetch(
      `http://localhost:8081/api/todo/category/getAll`
    );

    let data = await response.json();

    return data;
  };

  const onDelete = async (category) => {
    let response = await fetch(
      `http://localhost:8081/api/todo/category/delete/${category.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      dispatch({
        type: "remove-category",
        payload: category,
      });
    }
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-evenly md:flex-wrap">
      {state.map((category) => {
        return (
          <div key={category.id} className="border border-black p-5 bg-white">
            <div className="flex justify-around mb-5">
              <span className="text-black font-black">{category.title}</span>
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                disabled={clickedEdit.clicked}
                onClick={() => onDelete(category)}
              >
                Delete
              </button>
            </div>
            <TaskForm
              categoryId={category.id}
              clickedEdit={clickedEdit}
              setClickedEdit={setClickedEdit}
            />
            <ListOfTasks
              tasks={category.tasks}
              clickedEdit={clickedEdit}
              setClickedEdit={setClickedEdit}
            />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ListOfCategories;
