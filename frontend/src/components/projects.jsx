import React, { useEffect, useState } from 'react';
import ProjectForm from './projectForm';
import {Link} from 'react-router-dom';

const Projects = () => {
    const [projects, setProjects] = useState([]);
  
    // fetch all projects from the backend API
    useEffect(() => {
        fetch("http://localhost:5000/api/projects") // backend url
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error("Error fetching projects:", err));
    }, []);
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
  };

    const handleCreateProject = async (project) => {
      const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
      });
      if (response.ok) {
          fetchProjects(); // Refresh the project list
      }
  };
     
    return (
        <div>
          <h1>Projects</h1>
          <ProjectForm onSubmit={handleCreateProject} />
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
        </div>
      );
    };

export default Projects;