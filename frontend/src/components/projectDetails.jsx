import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch project info
    fetch(`http://127.0.0.1:5000/api/projects/${id}`)
      .then((res) => res.json())
      .then(setProject)
      .catch((err) => console.error("Error fetching project:", err));

    // Fetch tasks associated with the project
    fetch("http://127.0.0.1:5000/api/tasks")
      .then((res) => res.json())
      .then((allTasks) => {
        const filtered = allTasks.filter((task) => task.project_id === parseInt(id));
        setTasks(filtered);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [id]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);

  return project ? (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h3>Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id || Math.random()}>
            <strong>{task.title || "Untitled Task"}</strong> — {task.status || "No status"}
            <br />
            <small>{task.description || "No description provided"}</small>
          </li>
        ))}
      </ul>

      <h4>Add Task</h4>
      <TaskForm projectId={project.id} onTaskCreated={addTask} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProjectDetails;
