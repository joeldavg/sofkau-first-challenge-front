import React, { useContext, useEffect } from "react";
import ListOfTasks from "./ListOfTasks";
import { Store } from "./StoreProvider";
import TaskForm from "./TaskForm";

const ListOfCategories = () => {
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
            <button onClick={() => onDelete(category)}>Delete</button>
            <TaskForm categoryId={category.id} />
            <ListOfTasks tasks={category.tasks} />
            <br />
          </li>
        );
      })}
    </ul>
  );
};

export default ListOfCategories;
