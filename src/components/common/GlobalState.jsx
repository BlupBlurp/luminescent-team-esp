import React, { useState, createContext, useContext, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalState = ({ children }) => {
  // Always initialize with the same default on server and client first-render
  // to avoid hydration mismatches. The saved mode is read after hydration.
  const [globalState, setGlobalState] = useState({ mode: '2.0' });

  useEffect(() => {
    // Update sessionStorage when the mode changes
    sessionStorage.setItem('mode', globalState.mode);
  }, [globalState.mode]);

  useEffect(() => {
    // Read the saved mode from sessionStorage after hydration completes
    const storedMode = window.sessionStorage.getItem('mode');
    if (storedMode === '2.0' || storedMode === '3.0' || storedMode === 'vanilla') {
      setGlobalState((oldState) => ({ ...oldState, mode: storedMode }));
    }
  }, []);

  const updateMode = (newMode) => {
    if (newMode === '2.0' || newMode === '3.0' || newMode === 'vanilla') {
      setGlobalState((oldState) => ({
        ...oldState,
        mode: newMode,
      }));
    }
  };

  return (
    <GlobalContext.Provider value={[globalState, updateMode]}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
