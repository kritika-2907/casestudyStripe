import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';  
import { UserProvider, UserContext } from './UserContext';
import Navbar from './components/Navbar';
import Navbar1 from './components/Navbar1';
import Footer from './components/Footer';
import './App.css';
 
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
  const { isAuthenticated } = useContext(UserContext); // Access authentication status from UserContext
 
  return (
    <div className="wrapper">
      {isAuthenticated ? <Navbar1 /> : <Navbar />}
      <div className="main-content">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};
 
export default App;