import React, { useContext } from "react";
import ListOfTasks from "./ListOfTasks";
import { Store } from "./StoreProvider";
import TaskForm from "./TaskForm";

const ListOfCategories = () => {
  const { state, dispatch } = useContext(Store);

  const onDelete = (category) => {
    dispatch({
      type: "remove-category",
      payload: category,
    });
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
