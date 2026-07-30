import React, { useState, createContext, useContext, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalState = ({ children }) => {
  // Always initialize with '2.0' during both SSR and client hydration.
  // This prevents hydration mismatches caused by the `typeof window` branch
  // that React 18 explicitly warns about.
  const [globalState, setGlobalState] = useState({ mode: '2.0' });

  useEffect(() => {
    // After hydration, check sessionStorage for a previously saved mode.
    // This runs only on the client, after the initial render matches SSR.
    const storedMode = sessionStorage.getItem('mode');
    if (storedMode === '3.0' || storedMode === 'vanilla') {
      setGlobalState({ mode: storedMode });
    }
  }, []);

  useEffect(() => {
    // Persist mode changes to sessionStorage (client-side only).
    sessionStorage.setItem('mode', globalState.mode);
  }, [globalState.mode]);

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
