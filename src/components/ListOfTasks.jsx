import React from "react";
import Task from "./Task";

const ListOfTasks = ({ tasks }) => {
  return (
    <ol>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ol>
  );
};

export default ListOfTasks;
