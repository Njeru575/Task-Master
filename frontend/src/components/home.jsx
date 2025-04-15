import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Welcome to TaskMaster');
  const [loginData, setLoginData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      username: loginData.username,
      password: loginData.password,
    };

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (res.ok) {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify({ id: data.user_id }));
        setIsLoggedIn(true);
        navigate('/profile');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login.');
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      console.log('Register response:', data);

      if (res.ok) {
        alert('Registered successfully!');
        localStorage.setItem('user', JSON.stringify({ id: data.user_id || data.id }));
        setIsLoggedIn(true);
        navigate('/profile');
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong during registration.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1>{title}</h1>
      <p>Your go-to task manager.</p>

      {/* Show logout if logged in */}
      {isLoggedIn ? (
        <div style={{ marginBottom: '1rem' }}>
          <p>You're logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        // Login/Register form if not logged in
        <form onSubmit={handleLogin} className="login-form">
          <h3>Login / Register</h3>
          <div>
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required 
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">Login</button>
            <button type="button" onClick={handleRegister}>Register</button>
          </div>
        </form>
      )}

      {/* Project Navigation */}
      <Link to="/projects">
        <button style={{ marginTop: '1rem' }}>View Projects</button>
      </Link>
    </div>
  );
};

export default Home;