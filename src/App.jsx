import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };
  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const filteredTasks = tasks.filter((t) => {
    const name = t.title ?? t.name ?? t.task ?? "";
    return String(name).toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container className="my-5">
      <h1 className="mb-4">Task List</h1>
      <Button variant="primary" onClick={handleShowForm}>
        + Add Task
      </Button>

      <input
        className="form-control mt-3"
        placeholder="Cari task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-4">
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />
        <TaskForm
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />
      </div>
    </Container>
  );
}

export default App;