import React, { useContext, useEffect, useState } from "react";
import ListOfTasks from "./ListOfTasks";
import { Store } from "./StoreProvider";
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
                className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded-full "
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
