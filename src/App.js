import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({
    todo: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6'],
    inProgress: [],
    review: [],
    done: [],
    closed: []
  });

  const handleDragStart = (e, task, fromStatus) => {
    e.dataTransfer.setData('task', task);
    e.dataTransfer.setData('fromStatus', fromStatus);
    e.dataTransfer.setData('taskIndex', tasks[fromStatus].indexOf(task)); // Save the task's index
  };

  const handleDrop = (e, toStatus) => {
    const task = e.dataTransfer.getData('task');
    const fromStatus = e.dataTransfer.getData('fromStatus');
    const taskIndex = e.dataTransfer.getData('taskIndex');

    // If dropped in the same list, reorder tasks
    if (fromStatus === toStatus) {
      const updatedTasks = { ...tasks };
      updatedTasks[fromStatus].splice(taskIndex, 1); // Remove task from original position
      updatedTasks[toStatus].splice(e.target.getAttribute('data-index'), 0, task); // Insert at new position
      setTasks(updatedTasks);
      return;
    }

    // Otherwise, move between lists
    const updatedTasks = { ...tasks };
    updatedTasks[fromStatus] = updatedTasks[fromStatus].filter((t) => t !== task);
    updatedTasks[toStatus].push(task);

    setTasks(updatedTasks);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Simple Drag-and-Drop To-Do List</h1>
      <div className="board">
        {Object.keys(tasks).map((status) => (
          <div
            key={status}
            className="column"
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
          >
            <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
            {tasks[status].map((task, index) => (
              <div
                key={index}
                className="task"
                draggable
                onDragStart={(e) => handleDragStart(e, task, status)}
                data-index={index} // Add task index as a data attribute for reordering
              >
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
