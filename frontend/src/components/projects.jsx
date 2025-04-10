import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Projects = () => {
    const [projects, setProjects] = useState([]);
  
    // fetch all projects from the backend API
    useEffect(() => {
        fetch("http://localhost:5000/api/projects") // backend url
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error("Error fetching projects:", err));
    }, []);
}  