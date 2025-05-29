import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.length === 0 ? (
        <li>No tasks yet.</li>
      ) : (
        tasks.map((task) => (
          <li key={task._id || task.id || task.title}>{task.title || task}</li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
