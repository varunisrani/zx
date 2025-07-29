"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProject } from "@/lib/project-context";
import { Film, Mountain } from "lucide-react";

export const ProjectSelector = () => {
  const { selectedProject, setSelectedProject } = useProject();

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-muted-foreground">Project:</span>
      <div className="flex items-center space-x-2">
        <Button
          variant={selectedProject === 'avatar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedProject('avatar')}
          className="flex items-center space-x-2"
        >
          <Mountain className="h-4 w-4" />
          <span>Avatar</span>
        </Button>
        <Button
          variant={selectedProject === 'black-panther' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedProject('black-panther')}
          className="flex items-center space-x-2"
        >
          <Film className="h-4 w-4" />
          <span>Black Panther</span>
        </Button>
      </div>
      <Badge variant="outline" className="ml-2">
        {selectedProject === 'avatar' ? 'Sci-Fi Epic' : 'Marvel Superhero'}
      </Badge>
    </div>
  );
};