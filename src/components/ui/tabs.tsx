"use client";

import React, { createContext, useContext } from "react";

// Define a proper type for the context value
interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

// Create the context with `undefined` as the default and a proper type
const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      {children}
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex space-x-2 ${className}`}>{children}</div>
);

export const TabsTrigger = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs provider");
  }

  const { value: active, onValueChange } = context;
  const isActive = active === value;

  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 text-sm font-semibold rounded-md ${
        isActive ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs provider");
  }

  const { value: active } = context;
  return active === value ? <div>{children}</div> : null;
};
