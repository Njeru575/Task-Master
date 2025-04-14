import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/taskForm";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/${id}`)
      .then((res) => res.json())
      .then(setProject);

    fetch(`http://127.0.0.1:5000=${id}`)
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
