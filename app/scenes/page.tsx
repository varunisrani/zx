"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ProjectSelector } from "@/components/ProjectSelector";
import { useProject } from "@/lib/project-context";
import part1SceneData from "./blank-pantherscene-breakdown-agent copy/output.json";
import part2SceneData from "./blank-pantherscene-breakdown-agent copy/ouput.json";
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

type SceneData = typeof part1SceneData;
type Scene = SceneData['sceneBreakdownOutput']['detailedSceneBreakdowns'][0];

export default function SceneBreakdownPage() {
  const { selectedProject } = useProject();
  const [selectedPart, setSelectedPart] = useState<1 | 2>(1);
  
  // Set initial scene to scene 1 for Part 1
  const [selectedScene, setSelectedScene] = useState(1);

  // Get data from both JSON files
  const part1Data = part1SceneData.sceneBreakdownOutput.detailedSceneBreakdowns;
  const part2Data = part2SceneData.sceneBreakdownOutput.detailedSceneBreakdowns;
  
  // Use data as-is from JSON files without any mapping
  const part1Scenes = part1Data;
  const part2Scenes = part2Data;
  
  // Show actual scene ranges from the JSON data
  const part1Range = part1Scenes.length > 0 ? 
    `Scenes ${Math.min(...part1Scenes.map(s => s.sceneNumber))}-${Math.max(...part1Scenes.map(s => s.sceneNumber))}` : 
    'No scenes';
  const part2Range = part2Scenes.length > 0 ? 
    `Scenes ${Math.min(...part2Scenes.map(s => s.sceneNumber))}-${Math.max(...part2Scenes.map(s => s.sceneNumber))}` : 
    'No scenes';
  
  // Get current scenes and summary based on selected part
  const scenes = selectedPart === 1 ? part1Scenes : part2Scenes;
  const currentDataSource = selectedPart === 1 ? part1SceneData : part2SceneData;
  
  const summary = {
    ...currentDataSource.sceneBreakdownOutput.sceneAnalysisSummary,
    totalScenesProcessed: scenes.length,
    totalCharactersIdentified: new Set(scenes.flatMap(s => s.characters.speaking.map(c => c.name))).size,
    totalLocationsIdentified: new Set(scenes.map(s => s.location.primaryLocation)).size
  };

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

  const selectedSceneData = scenes.find(s => s.sceneNumber === selectedScene) || scenes[0];

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
                  Black Panther - Scene Breakdown
                </h1>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Badge variant="outline">
                  {summary.totalScenesProcessed} Total Scenes
                </Badge>
                <Badge variant="secondary">
                  Part {selectedPart}
                </Badge>
              </div>
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

      {/* Part Toggle */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-background rounded-lg p-1 border">
              <Button
                variant={selectedPart === 1 ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setSelectedPart(1);
                  setSelectedScene(part1Scenes[0]?.sceneNumber || 1);
                }}
                className="rounded-md px-4 py-2"
              >
                Part 1
                <Badge variant="outline" className="ml-2 text-xs">
                  {part1Range}
                </Badge>
              </Button>
              <Button
                variant={selectedPart === 2 ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setSelectedPart(2);
                  setSelectedScene(part2Scenes[0]?.sceneNumber || 101);
                }}
                className="rounded-md px-4 py-2"
              >
                Part 2
                <Badge variant="outline" className="ml-2 text-xs">
                  {part2Range}
                </Badge>
              </Button>
            </div>
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
                Average Complexity
              </CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {(scenes.reduce((sum, s) => sum + s.complexityScores.overallComplexity, 0) / scenes.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">out of 10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Pages
              </CardTitle>
              <Timer className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {scenes.reduce((sum, s) => sum + s.pageCount, 0).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">script pages</p>
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
              <p className="text-xs text-muted-foreground">of {scenes.length} scenes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scene List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Scene List - Part {selectedPart}</CardTitle>
                <CardDescription>Click to view detailed breakdown ({scenes.length} scenes)</CardDescription>
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