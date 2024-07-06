import React from "react";
import TaskContainer from "./TaskContainer";

const Important = () => {
  return <TaskContainer title="Important Tasks" fetchUrl="http://localhost:3000/api/v1/task/important" />;
};

export default Important;
