import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to TaskMaster</h1>
      <p>Your go-to task manager.</p>
      <Link to="/projects">
        <button>View Projects</button>
      </Link>
    </div>
  );
};

export default Home;
