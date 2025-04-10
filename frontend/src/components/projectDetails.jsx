import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`)
      .then((res) => res.json())
      .then(setProject);

    fetch(`http://localhost:5000/tasks?project_id=${id}`)
      .then((res) => res.json())
      .then(setTasks);
  }, [id]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);

  return project ? (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h3>Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>

      <h4>Add Task</h4>
      <TaskForm projectId={project.id} onCreate={addTask} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProjectDetails;
