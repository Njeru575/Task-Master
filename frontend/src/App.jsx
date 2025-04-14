

import React from 'react';
import { 
  BrowserRouter as Router,  // decided to use alias for cleaner code
  Routes, 
  Route 
} from 'react-router-dom';

// Component imports
import Navbar from './components/navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Profile from './components/Profile';
// import Settings from './components/Settings';  // will add this later if needs be

function App() {
  // might need to add auth check here later
  // const isAuthenticated = false;  // ToDo: implement auth

  return (
    <Router>
      {/* Main app wrapper */}
      <div className="app-container">  {/* added className for styling */}
        <Navbar />  {/* show nav at top */}
        
        {/* Main content area */}
        <div className="main-content">
          <Routes>
            {/* Homepage route */}
            <Route 
              path="/" 
              element={<Home />}  // using element instead of component
            />
            
            {/* Project routes */}
            <Route 
              path="/projects" 
              element={<Projects />}  // using element instead of component
            />
            <Route 
              path="/projects/:id"  // dynamic route for individual projects
              element={<ProjectDetails />}  // using element instead of component
            />
            
            {/* User routes */}
            <Route 
              path="/profile" 
              element={<Profile />}  // using element instead of component
            />

            {/* i Will Add more routes here later */}
            {/* <Route path="/settings" element={<Settings />} /> */}
            
            {/* ToDo: Add 404 route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Need to wrap with auth provider later
export default App;


