// Add the "use client" directive at the top of the file
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Story } from '../types/types';

interface StoryContextType {
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [stories, setStories] = useState<Story[]>([]);

  return (
    <StoryContext.Provider value={{ stories, setStories }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStories = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStories must be used within a StoryProvider');
  }
  return context;
};
