// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ 
        title: '', 
        description: '', 
        priority: 'medium', 
        deadline: '', 
    });

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/tasks', newTask);
            setTasks([...tasks, res.data]);
            setNewTask({ title: '', description: '', priority: 'medium', deadline: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const handleTaskCompletion = async (taskId) => {
        try {
            const updatedTask = { completed: true };
            const res = await axios.patch(`http://localhost:5000/tasks/${taskId}`, updatedTask);
            setTasks(tasks.map(task => task._id === taskId ? res.data : task));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Task Management</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    value={newTask.title} 
                    onChange={handleInputChange} 
                    placeholder="Task Title"
                    required
                />
                <input 
                    type="text" 
                    name="description" 
                    value={newTask.description} 
                    onChange={handleInputChange} 
                    placeholder="Task Description"
                    required
                />
                <select name="priority" value={newTask.priority} onChange={handleInputChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input 
                    type="date" 
                    name="deadline" 
                    value={newTask.deadline} 
                    onChange={handleInputChange} 
                />
                <button type="submit">Add Task</button>
            </form>

            <div>
                <h2>Task List</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <span>{task.title}</span> - 
                            <span>{task.priority}</span> - 
                            <span>{new Date(task.deadline).toLocaleDateString()}</span>
                            <button onClick={() => handleTaskCompletion(task._id)}>
                                {task.completed ? 'Completed' : 'Mark as Completed'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;

