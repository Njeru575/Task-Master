import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectForm from './projectForm';

const Projects = () => {
    const [projects, setProjects] = useState([]);
  
    // fetch all projects from the backend API
    useEffect(() => {
        fetch("http://localhost:5000/api/projects") // backend url
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error("Error fetching projects:", err));
    }, []);

    return (
        <div>
          <h2>All Projects</h2>
    
          {/* display no projects found if projects haven't loaded */}
          {projects.length === 0 ? (
            <p>No projects found!</p>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  {/* link to project details page */}
                  <Link to={`/projects/${project.id}`}>
                    <strong>{project.title}</strong>: {project.description}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };

export default Projects;