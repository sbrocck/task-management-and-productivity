import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Socket server URL

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Listen for real-time task updates
    socket.on('taskUpdated', (updatedTask) => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    // Cleanup on component unmount
    return () => socket.off('taskUpdated');
  }, []);

  // Fetch tasks from API
  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div>
      <h1>Task Management App</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
