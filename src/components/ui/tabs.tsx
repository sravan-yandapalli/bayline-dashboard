// components/ui/tabs.tsx
"use client";
import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext<any>(null);

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
  const { value: active, onValueChange } = useContext(TabsContext);
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
  const { value: active } = useContext(TabsContext);
  return active === value ? <div>{children}</div> : null;
};
