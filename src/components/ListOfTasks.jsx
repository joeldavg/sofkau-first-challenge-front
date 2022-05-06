import React from "react";
import Task from "./Task";

const ListOfTasks = ({ tasks, clickedEdit, setClickedEdit }) => {
  return (
    <ol>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          clickedEdit={clickedEdit}
          setClickedEdit={setClickedEdit}
        />
      ))}
    </ol>
  );
};

export default ListOfTasks;
