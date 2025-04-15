import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectForm from './projectForm';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleCreateProject = async (project) => {
    try {
      const payload = {
        ...project,
        user_id: 1  // hardcoded for now
      };

      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchProjects();
      } else {
        console.error("Failed to create project:", await response.text());
      }
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleUpdateProject = async (project) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: project.title,
          description: project.description,
        }),
      });

      if (response.ok) {
        setEditingProject(null); // Exit edit mode
        fetchProjects();
      } else {
        console.error("Failed to update project:", await response.text());
      }
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects();
      } else {
        console.error("Failed to delete project:", await response.text());
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div>
      <h1>Projects</h1>

      <ProjectForm
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        initialValues={editingProject}
        isEditing={!!editingProject}
        onCancel={() => setEditingProject(null)}
      />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.title}</Link> - {project.description}
            <button onClick={() => setEditingProject(project)} className="btn btn-sm btn-warning mx-2">
              Edit
            </button>
            <button onClick={() => handleDeleteProject(project.id)} className="btn btn-sm btn-danger">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;