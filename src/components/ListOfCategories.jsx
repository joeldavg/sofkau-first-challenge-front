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
    <ul>
      {state.map((category) => {
        return (
          <li key={category.id}>
            {category.title}
            <button
              disabled={clickedEdit.clicked}
              onClick={() => onDelete(category)}
            >
              Delete
            </button>
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
          </li>
        );
      })}
    </ul>
  );
};

export default ListOfCategories;
