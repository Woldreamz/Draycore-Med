"use client";

import { createContext, useState, ReactNode } from "react";

const initialValue = { isCollapsed: false, toggleSidebarcollapse: () => {} };

const SidebarContext = createContext(initialValue);

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setCollapse] = useState(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
