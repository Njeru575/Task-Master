import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // 👈 for editing

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/projects/${id}`)
      .then((res) => res.json())
      .then(setProject)
      .catch((err) => console.error("Error fetching project:", err));

    fetch(`http://127.0.0.1:5000/api/tasks`)
      .then((res) => res.json())
      .then((allTasks) => {
        const filtered = allTasks.filter((task) => task.project_id === parseInt(id));
        setTasks(filtered);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [id]);

  const addTask = (newTask) => setTasks((prev) => [...prev, newTask]);

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null); // reset edit mode
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return project ? (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h3>Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.status}
            <br />
            <small>{task.description}</small>
            <br />
            <button onClick={() => handleEditClick(task)}>Edit</button>
          </li>
        ))}
      </ul>

      <h4>{taskToEdit ? "Edit Task" : "Add Task"}</h4>
      <TaskForm
        projectId={project.id}
        onTaskCreated={addTask}
        taskToEdit={taskToEdit}
        onTaskUpdated={updateTask}
      />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProjectDetails;