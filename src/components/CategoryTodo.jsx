import React, { useContext } from "react";
import { Store } from "./StoreProvider";

const CategoryTodo = () => {
  const { state, dispatch } = useContext(Store);

  const onDelete = (note) => {
    dispatch({
      type: "remove-category",
      payload: note,
    });
  };

  return (
    <div>
      <ul>
        {state.listOfCategories.map((category) => {
          return (
            <li key={category.id}>
              {category.title} <br />
              <button onClick={() => onDelete(category)}>Delete</button>
              <ol>
                {category.tasks.map((task) => {
                  return <li key={task.id}>{task.message}</li>;
                })}
              </ol>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryTodo;
