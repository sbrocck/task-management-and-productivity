import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);  // Initialize tasks as an empty array

  return (
    <div className="App">
      <h1>Task Management App</h1>
      <div>
        {/* Button to create a new task */}
        <button onClick={() => alert('Create Task')}>Create Task</button>
      </div>
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
