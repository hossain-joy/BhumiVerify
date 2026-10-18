import React, { createContext, useContext } from 'react';

interface UIContextType {
  // Minimal UI context for MVP
}

const UIContext = createContext<UIContextType>({});

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <UIContext.Provider value={{}}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
