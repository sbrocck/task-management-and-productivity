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
    const [filter, setFilter] = useState({ priority: '', completed: '', deadline: '' });

    // Fetch tasks with optional filters
    const fetchTasks = async (filters = {}) => {
        try {
            const res = await axios.get('http://localhost:5000/tasks', { params: filters });
            setTasks(res.data);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        }
    };

    // Initial load and on filter change
    useEffect(() => {
        fetchTasks(filter);
    }, [filter]);

    // Handle new task form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    // Handle filter input changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    // Submit new task to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/tasks', newTask);
            setTasks(prev => [...prev, res.data]);
            setNewTask({ title: '', description: '', priority: 'medium', deadline: '' });
        } catch (err) {
            console.error('Failed to add task:', err);
        }
    };

    // Mark task as completed
    const handleTaskCompletion = async (taskId) => {
        try {
            const res = await axios.patch(`http://localhost:5000/tasks/${taskId}`, { completed: true });
            setTasks(prev => prev.map(task => (task._id === taskId ? res.data : task)));
        } catch (err) {
            console.error('Failed to update task:', err);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
            <h1>Task Management</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Task Title"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Task Description"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                    style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem' }}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="date"
                    name="deadline"
                    value={newTask.deadline}
                    onChange={handleInputChange}
                    style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add Task</button>
            </form>

            <section style={{ marginBottom: '2rem' }}>
                <h2>Filter Tasks</h2>
                <select
                    name="priority"
                    value={filter.priority}
                    onChange={handleFilterChange}
                    style={{ marginRight: '1rem', padding: '0.5rem' }}
                >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <select
                    name="completed"
                    value={filter.completed}
                    onChange={handleFilterChange}
                    style={{ marginRight: '1rem', padding: '0.5rem' }}
                >
                    <option value="">All Statuses</option>
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>

                <input
                    type="date"
                    name="deadline"
                    value={filter.deadline}
                    onChange={handleFilterChange}
                    style={{ padding: '0.5rem' }}
                />
            </section>

            <div>
                <h2>Task List</h2>
                {tasks.length === 0 ? (
                    <p>No tasks available.</p>
                ) : (
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                        {tasks.map(task => (
                            <li key={task._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                                <strong>{task.title}</strong> <br />
                                <em>{task.description}</em> <br />
                                Priority: {task.priority} <br />
                                Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'} <br />
                                Status: {task.completed ? 'Completed' : 'Pending'} <br />
                                {!task.completed && (
                                    <button onClick={() => handleTaskCompletion(task._id)} style={{ marginTop: '0.5rem' }}>
                                        Mark as Completed
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default App;
