import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    const handleTaskCreate = (task) => {
        setTasks([...tasks, task]);
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
