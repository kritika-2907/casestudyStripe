import React, { createContext, useState } from 'react';

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

  return (
    <UserContext.Provider value={{ isAuthenticated, userEmail, isAdmin, setIsAuthenticated, setUserEmail, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
