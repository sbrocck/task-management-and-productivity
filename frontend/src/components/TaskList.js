import React from "react";

const TaskList = ({ tasks }) => {
    return (
        <ul>
            {tasks.length === 0 ? (
                <li>No tasks yet.</li>
            ) : (
                tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))
            )}
        </ul>
    );
};

export default TaskList;
