import React, { useEffect } from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, fetchTasks, onEditClick, onDeleteClick, calculateDaysRemaining, dateOfTask, setTasks, setErrorMessage }) => {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (tasks.length === 0) {
    return <div>No Tasks found</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          calculateDaysRemaining={calculateDaysRemaining}
          dateOfTask={dateOfTask}
          setTasks={setTasks}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </div>
  );
};

export default TaskList;
