"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

export type ProjectType = 'avatar' | 'black-panther';

interface ProjectContextType {
  selectedProject: ProjectType;
  setSelectedProject: (project: ProjectType) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectType>('avatar');

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};