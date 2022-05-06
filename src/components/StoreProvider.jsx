import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = [
  {
    id: 0,
    title: "Default Category",
    tasks: [
      {
        id: 1,
        message: "default task1",
        done: false,
        categoryId: 0,
      },
      {
        id: 2,
        message: "default task2",
        done: false,
        categoryId: 0,
      },
    ],
  },
  {
    id: 3,
    title: "Default Category2",
    tasks: [
      {
        id: 4,
        message: "default task1",
        done: false,
        categoryId: 3,
      },
      {
        id: 5,
        message: "default task2",
        done: false,
        categoryId: 3,
      },
      {
        id: 6,
        message: "default task3",
        done: false,
        categoryId: 3,
      },
    ],
  },
];

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;

export { Store, initialState };
