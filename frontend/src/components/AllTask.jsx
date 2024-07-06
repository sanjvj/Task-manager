import React from "react";
import TaskContainer from "./TaskContainer";

const AllTask = () => {
  return <TaskContainer title="All Tasks" fetchUrl="http://localhost:3000/api/v1/task/alltask" />;
};

export default AllTask;
