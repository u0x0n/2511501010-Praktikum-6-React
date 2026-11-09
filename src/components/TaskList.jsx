import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  // Menentukan warna badge berdasarkan priority
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  // Menentukan warna indikator berdasarkan status
  const getStatusVariant = (status) => {
    switch (status) {
      case "To Do":
        return "secondary";
      case "In Progress":
        return "primary";
      case "Completed":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <Card className="mb-3 shadow-sm" key={task.id}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.name}</h5>

              <strong>Priority: </strong>
              <Badge bg={getPriorityVariant(task.priority)}>
                {task.priority}
              </Badge>
              <br />

              <strong>Status: </strong>
              <Badge bg={getStatusVariant(task.status)}>{task.status}</Badge>
            </div>

            <div>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => showEditForm(task)}
              >
                <PencilSquare /> Edit
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                <Trash /> Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
