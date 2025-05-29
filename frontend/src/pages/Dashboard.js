import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreate = (newTask) => {
    // Add the new task to the existing tasks array
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <TaskForm onTaskCreate={handleTaskCreate} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
