"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ProjectSelector } from "@/components/ProjectSelector";
import { useProject } from "@/lib/project-context";
import avatarSceneData from "../scenes/avatarscene-breakdown-agent/output.json";
import blackPantherSceneData from "../scenes/blank-pantherscene-breakdown-agent copy/output.json";
import { 
  Film, 
  Clock, 
  DollarSign, 
  MapPin,
  Users,
  Camera,
  Lightbulb,
  Mic,
  Palette,
  AlertTriangle,
  Search,
  Filter,
  FileText,
  BarChart3,
  Zap,
  Truck,
  PawPrint,
  TrendingUp,
  Timer,
  Target
} from "lucide-react";

type AvatarSceneData = typeof avatarSceneData;
type BlackPantherSceneData = typeof blackPantherSceneData;
type AvatarScene = AvatarSceneData['sceneBreakdownOutput']['detailedSceneBreakdowns'][0];
type BlackPantherScene = BlackPantherSceneData['sceneBreakdownOutput']['detailedSceneBreakdowns'][0];

export default function SceneBreakdownPage() {
  const { selectedProject } = useProject();
  const [selectedScene, setSelectedScene] = useState(1);

  // Get data based on selected project
  const isAvatar = selectedProject === 'avatar';
  const currentData = isAvatar ? avatarSceneData : blackPantherSceneData;
  const scenes = isAvatar ? 
    avatarSceneData.sceneBreakdownOutput.detailedSceneBreakdowns : 
    blackPantherSceneData.sceneBreakdownOutput.detailedSceneBreakdowns;
  const summary = isAvatar ? 
    avatarSceneData.sceneBreakdownOutput.sceneAnalysisSummary : 
    blackPantherSceneData.sceneBreakdownOutput.sceneAnalysisSummary;

  const getComplexityColor = (complexity: number) => {
    if (complexity >= 8) return "destructive";
    if (complexity >= 6) return "outline";
    return "secondary";
  };

  const getComplexityLabel = (complexity: number) => {
    if (complexity >= 8) return "Extreme";
    if (complexity >= 6) return "High";
    if (complexity >= 4) return "Medium";
    return "Low";
  };

  const selectedSceneData = scenes.find(s => s.sceneNumber === selectedScene);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Film className="h-8 w-8 text-brand-primary" />
                <h1 className="text-2xl font-bold text-foreground">
                  {isAvatar ? 'Avatar' : 'Black Panther'} - Scene Breakdown
                </h1>
              </div>
              <Badge variant="outline" className="ml-4">
                {summary.totalScenesProcessed} Total Scenes
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Navigation />
            <ProjectSelector />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Scenes
              </CardTitle>
              <Film className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{summary.totalScenesProcessed}</div>
              <p className="text-xs text-muted-foreground">{summary.totalLocationsIdentified} unique locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Screen Time
              </CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {isAvatar ? '15:30' : '20:45'}
              </div>
              <p className="text-xs text-muted-foreground">{summary.totalCharactersIdentified} characters</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Production Hours
              </CardTitle>
              <Timer className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {isAvatar ? '720' : '480'}
              </div>
              <p className="text-xs text-muted-foreground">Production hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                High Complexity
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {scenes.filter(s => s.complexityScores.overallComplexity >= 8).length}
              </div>
              <p className="text-xs text-muted-foreground">of {summary.totalScenesProcessed} scenes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scene List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Scene List</CardTitle>
                <CardDescription>Click to view detailed breakdown</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[800px] overflow-y-auto">
                  {scenes.map((scene) => (
                    <div key={scene.sceneNumber}>
                      <div 
                        className={`p-4 cursor-pointer hover:bg-muted/50 border-l-2 ${
                          selectedScene === scene.sceneNumber ? 'border-brand-primary bg-muted/30' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedScene(scene.sceneNumber)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">Scene {scene.sceneNumber}</span>
                            <Badge variant={getComplexityColor(scene.complexityScores.overallComplexity)} className="text-xs">
                              {getComplexityLabel(scene.complexityScores.overallComplexity)}
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {scene.location.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{scene.sceneHeader}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{scene.estimatedScreenTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="h-3 w-3" />
                            <span>{scene.pageCount}p</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scene Details */}
          <div className="lg:col-span-2">
            {selectedSceneData && (
              <div className="space-y-6">
                {/* Scene Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Scene {selectedSceneData.sceneNumber}: {selectedSceneData.sceneHeader}</CardTitle>
                        <CardDescription className="mt-2">
                          {selectedSceneData.pageCount} pages • {selectedSceneData.estimatedScreenTime} screen time • {selectedSceneData.location.primaryLocation}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getComplexityColor(selectedSceneData.complexityScores.overallComplexity)}>
                          {getComplexityLabel(selectedSceneData.complexityScores.overallComplexity)} Complexity
                        </Badge>
                        <Badge variant="outline">
                          {selectedSceneData.location.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedSceneData.location.primaryLocation}</p>
                          <p className="text-xs text-muted-foreground">{selectedSceneData.location.timeOfDay}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedSceneData.estimatedScreenTime}</p>
                          <p className="text-xs text-muted-foreground">Screen Time</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedSceneData.pageCount} pages</p>
                          <p className="text-xs text-muted-foreground">Script Length</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedSceneData.timeEstimates.totalHours}h</p>
                          <p className="text-xs text-muted-foreground">Total Time</p>
                        </div>
                      </div>
                    </div>

                    {/* Complexity Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexityScores.technicalDifficulty}</div>
                        <div className="text-xs text-muted-foreground">Technical</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexityScores.castComplexity}</div>
                        <div className="text-xs text-muted-foreground">Cast</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexityScores.locationChallenges}</div>
                        <div className="text-xs text-muted-foreground">Location</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexityScores.overallComplexity}</div>
                        <div className="text-xs text-muted-foreground">Overall</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Characters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Characters & Cast</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedSceneData.characters.speaking.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-green-600">Speaking Characters</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedSceneData.characters.speaking.map((char, index) => (
                            <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">{char.name}</h5>
                                <Badge variant="outline" className="text-xs">
                                  Speaking
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {char.dialogueLines || 0} lines • {char.firstAppearance ? 'First appearance' : 'Continuing'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedSceneData.characters.nonSpeaking && selectedSceneData.characters.nonSpeaking.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-blue-600">Non-Speaking Characters</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedSceneData.characters.nonSpeaking.map((char, index) => (
                            <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">{char.description}</h5>
                                <Badge variant="outline" className="text-xs">
                                  {char.count}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">Non-speaking role</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedSceneData.characters.background.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-purple-600">Background Characters</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedSceneData.characters.background.map((char, index) => (
                            <div key={index} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">{char.description}</h5>
                                <Badge variant="outline" className="text-xs">
                                  {char.estimatedCount} people
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Background extras
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Location Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Location Requirements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Primary Location</label>
                          <p className="font-medium">{selectedSceneData.location.primaryLocation}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Secondary</label>
                          <p className="font-medium">{selectedSceneData.location.secondaryLocation || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Time of Day</label>
                          <p className="font-medium">{selectedSceneData.location.timeOfDay}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Complexity</label>
                          <Badge variant={selectedSceneData.location.complexityLevel === 'extreme' ? 'destructive' : 
                                        selectedSceneData.location.complexityLevel === 'complex' ? 'outline' : 'secondary'}>
                            {selectedSceneData.location.complexityLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Considerations */}
                {selectedSceneData.specialConsiderations && selectedSceneData.specialConsiderations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <span>Special Considerations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedSceneData.specialConsiderations.map((note, index) => (
                          <div key={index} className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{note}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}