import React from "react";
import Task from "./Task";

const ListOfTasks = ({ tasks, clickedEdit, setClickedEdit }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          clickedEdit={clickedEdit}
          setClickedEdit={setClickedEdit}
        />
      ))}
    </table>
  );
};

export default ListOfTasks;
