import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';  // Import the routing component
import { UserProvider, UserContext } from './UserContext'; // Import the context provider
import Navbar from './components/Navbar'; // Unauthenticated Navbar
import Navbar1 from './components/Navbar1'; // Authenticated Navbar
import Footer from './components/Footer'; // Import Footer
import './App.css'; // Import the CSS for wrapper styles


const App = () => {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Router>
        <MainApp /> {/* Separate main app component to use context */}
      </Router>
    </UserProvider>
  );
};

const MainApp = () => {
  const { isAuthenticated } = useContext(UserContext); // Get authentication status from UserContext

  return (
    <div className="wrapper"> {/* Ensure footer is at the bottom */}
      {isAuthenticated ? <Navbar1 /> : <Navbar />} {/* Conditionally render Navbar based on authentication */}
      <div className="main-content">
        <AppRoutes /> {/* The rest of your application routes */}
      </div>
      <Footer /> {/* Add the Footer at the bottom of the app */}
    </div>
  );
};

export default App;
