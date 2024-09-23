import React, { createContext, useState, useEffect } from 'react';
 
// Create a UserContext with default values
export const UserContext = createContext({
  isAuthenticated: false,
  userEmail: null,
  isAdmin: false,
  setIsAuthenticated: () => {},
  setUserEmail: () => {},
  setIsAdmin: () => {},
});
 
export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
 
  // Check localStorage when the app loads or refreshes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('userEmail');
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true'; // localStorage stores everything as strings
 
    if (token && storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
      setIsAdmin(storedIsAdmin);
    }
  }, []);
 
  return (
    <UserContext.Provider value={{ isAuthenticated, userEmail, isAdmin, setIsAuthenticated, setUserEmail, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};