import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectForm from './projectForm';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  // Fetch all projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Handle project creation
  const handleCreateProject = async (project) => {
    try {
      const payload = {
        ...project,
        user_id: 1  // replace with logged-in user ID later
      };

      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchProjects(); // Refresh project list
      } else {
        console.error("Failed to create project:", await response.text());
      }
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      <ProjectForm onSubmit={handleCreateProject} />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;