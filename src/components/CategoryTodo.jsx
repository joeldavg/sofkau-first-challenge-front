import React, { useContext } from "react";
import { Store } from "./StoreProvider";

const CategoryTodo = () => {
  const { state, dispatch } = useContext(Store);

  console.log(state);

  return (
    <div>
      <h1>Category Dashboard</h1>
      <ul>
        {state.listOfCategories.map((category) => {
          return (
            <li key={category.id}>
              {category.title} <br />
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
