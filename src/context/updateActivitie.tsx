"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UpdateActivitieContextType {
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateActivitieContext = createContext<UpdateActivitieContextType | undefined>(undefined);

export const UpdateActivitieProvider = ({ children }: { children: ReactNode }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <UpdateActivitieContext.Provider value={{ isUpdated, setIsUpdated }}>
      {children}
    </UpdateActivitieContext.Provider>
  );
};

export const useUpdateActivitie = () => {
  const context = useContext(UpdateActivitieContext);
  if (!context) {
    throw new Error('useUpdateActivitie must be used within an UpdateActivitieProvider');
  }
  return context;
};