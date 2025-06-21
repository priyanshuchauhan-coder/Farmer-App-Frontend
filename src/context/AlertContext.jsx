// src/contexts/AlertContext.js
import { createContext, useState, useCallback } from 'react';

 const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState(false);

  const showAlert = useCallback((message, type, duration = 3000) => {
    setAlert({ message, type });
    setShow(true);
    
    const timer = setTimeout(() => {
      setShow(false);
      // Small delay before removing alert to allow fade-out animation
      setTimeout(() => setAlert(null), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hideAlert = useCallback(() => {
    setShow(false);
    setTimeout(() => setAlert(null), 300);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, show, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;