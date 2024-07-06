import React from "react";
import TaskContainer from "./TaskContainer";

const Completed = () => {
  return <TaskContainer title="Completed Tasks" fetchUrl="http://localhost:3000/api/v1/task/completed" />;
};

export default Completed;
