import React, { useState } from "react";
import "./dashboard.css";

export const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [tasks, setTasks] = useState({
    backlog: [
      { id: 1, text: "Fix the first project" },
      { id: 2, text: "Create new form upload to db" },
    ],
    pending: [{ id: 3, text: "Fix the SQL statement to get the projects" }],
    inProgress: [
      { id: 4, text: "Fix create db function. Error checking required" },
    ],
    completed: [{ id: 5, text: "Create new board" }],
  });

  const [newTask, setNewTask] = useState("");

  // Función para agregar tareas
  const handleAddTask = (column) => {
    if (newTask.trim()) {
      const task = { id: Date.now(), text: newTask };
      setTasks((prevTasks) => ({
        ...prevTasks,
        [column]: [...prevTasks[column], task],
      }));
      setNewTask("");
    }
  };

  // Función para eliminar tareas
  const handleDeleteTask = (column, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].filter((task) => task.id !== taskId),
    }));
  };

  // Renderizado de columnas
  const renderColumn = (columnName, columnData) => (
    <div className="column">
      <h3>{columnName}</h3>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={() => handleAddTask(columnName)}>Save</button>
      <ul>
        {columnData.map((task) => (
          <li key={task.id}>
            {task.text}
            <div>
              <button onClick={() => handleDeleteTask(columnName, task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="kanban-board">
      <h1>Kanban Board</h1>
      <div className="columns">
        {renderColumn("Pendiente", tasks.pending)}
        {renderColumn("En curso", tasks.inProgress)}
        {renderColumn("Completo", tasks.completed)}
      </div>
    </div>
  );
};
