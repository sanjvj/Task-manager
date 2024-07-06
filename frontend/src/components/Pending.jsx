import React from "react";
import TaskContainer from "./TaskContainer";

const Pending = () => {
  return <TaskContainer title="Pending Tasks" fetchUrl="http://localhost:3000/api/v1/task/pending" />;
};

export default Pending;
