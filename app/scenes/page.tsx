"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import sceneData from "../scenes/scencebrackdown.json";
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
  Car,
  Star,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  Eye,
  FileText,
  BarChart3,
  Zap,
  Wrench,
  Truck,
  PawPrint,
  Shield,
  Clapperboard,
  Target,
  TrendingUp,
  Timer,
  Hammer,
  Music,
  Wind,
  Flame
} from "lucide-react";

type SceneData = typeof sceneData;
type Scene = SceneData['phase_1_screenplay_breakdown']['complete_scenes_1_20_breakdowns'][0];

export default function SceneBreakdownPage() {
  const [selectedScene, setSelectedScene] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const scenes = sceneData.phase_1_screenplay_breakdown.complete_scenes_1_20_breakdowns;
  const summary = sceneData.phase_1_production_summary;

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

  const selectedSceneData = scenes.find(s => s.scene_number === selectedScene);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Film className="h-8 w-8 text-brand-primary" />
                <h1 className="text-2xl font-bold text-foreground">2001: A Space Odyssey - Scene Breakdown</h1>
              </div>
              <Badge variant="outline" className="ml-4">
                {summary.total_scenes_analyzed} Total Scenes
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
          <Navigation />
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
              <div className="text-2xl font-bold text-foreground">{summary.total_scenes_analyzed}</div>
              <p className="text-xs text-muted-foreground">{summary.phase_1_location_summary.unique_locations} unique locations</p>
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
              <div className="text-2xl font-bold text-foreground">{summary.estimated_screen_time_phase_1}</div>
              <p className="text-xs text-muted-foreground">{summary.total_page_count} script pages</p>
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
              <div className="text-2xl font-bold text-foreground">{summary.phase_1_technical_summary.total_production_hours}</div>
              <p className="text-xs text-muted-foreground">{summary.phase_1_technical_summary.total_shooting_hours} shooting hours</p>
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
              <div className="text-2xl font-bold text-foreground">{summary.phase_1_technical_summary.high_complexity_scenes}</div>
              <p className="text-xs text-muted-foreground">of {summary.total_scenes_analyzed} scenes</p>
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
                    <div key={scene.scene_number}>
                      <div 
                        className={`p-4 cursor-pointer hover:bg-muted/50 border-l-2 ${
                          selectedScene === scene.scene_number ? 'border-brand-primary bg-muted/30' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedScene(scene.scene_number)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">Scene {scene.scene_number}</span>
                            <Badge variant={getComplexityColor(scene.complexity_scores.overall_complexity)} className="text-xs">
                              {getComplexityLabel(scene.complexity_scores.overall_complexity)}
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {scene.location.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{scene.scene_header}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{scene.estimated_screen_time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="h-3 w-3" />
                            <span>{scene.page_count}p</span>
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
                        <CardTitle className="text-xl">Scene {selectedSceneData.scene_number}: {selectedSceneData.scene_header}</CardTitle>
                        <CardDescription className="mt-2">
                          {selectedSceneData.page_count} pages • {selectedSceneData.estimated_screen_time} screen time • {selectedSceneData.location.primary}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getComplexityColor(selectedSceneData.complexity_scores.overall_complexity)}>
                          {getComplexityLabel(selectedSceneData.complexity_scores.overall_complexity)} Complexity
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
                          <p className="text-sm font-medium">{selectedSceneData.location.primary}</p>
                          <p className="text-xs text-muted-foreground">{selectedSceneData.location.time_of_day}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedSceneData.estimated_screen_time}</p>
                          <p className="text-xs text-muted-foreground">Screen Time</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedSceneData.page_count} pages</p>
                          <p className="text-xs text-muted-foreground">Script Length</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedSceneData.complexity_scores.time_requirements.total_hours}h</p>
                          <p className="text-xs text-muted-foreground">Total Time</p>
                        </div>
                      </div>
                    </div>

                    {/* Complexity Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexity_scores.technical_difficulty}</div>
                        <div className="text-xs text-muted-foreground">Technical</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexity_scores.cast_complexity}</div>
                        <div className="text-xs text-muted-foreground">Cast</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexity_scores.location_challenges}</div>
                        <div className="text-xs text-muted-foreground">Location</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold">{selectedSceneData.complexity_scores.overall_complexity}</div>
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
                                  {char.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {char.presence} • {char.dialogue_lines || 0} lines
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedSceneData.characters.non_speaking.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-blue-600">Non-Speaking Characters</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedSceneData.characters.non_speaking.map((char, index) => (
                            <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">{char.name}</h5>
                                <Badge variant="outline" className="text-xs">
                                  {char.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{char.presence}</p>
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
                                <h5 className="font-medium text-sm">{char.name}</h5>
                                <Badge variant="outline" className="text-xs">
                                  {char.quantity} people
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {char.category} • {char.presence}
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
                          <p className="font-medium">{selectedSceneData.location.primary}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Secondary</label>
                          <p className="font-medium">{selectedSceneData.location.secondary}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Time of Day</label>
                          <p className="font-medium">{selectedSceneData.location.time_of_day}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Complexity</label>
                          <Badge variant={selectedSceneData.location.complexity === 'extreme' ? 'destructive' : 
                                        selectedSceneData.location.complexity === 'complex' ? 'outline' : 'secondary'}>
                            {selectedSceneData.location.complexity}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Special Requirements</label>
                        <div className="space-y-2 mt-2">
                          {selectedSceneData.location.special_requirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Target className="h-3 w-3 text-blue-600" />
                              <span className="text-sm">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-5 w-5" />
                      <span>Technical Requirements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Camera className="h-4 w-4 text-blue-600 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">Camera</h4>
                            <p className="text-xs text-muted-foreground mb-2">{selectedSceneData.technical_requirements.camera.movement}</p>
                            <div className="space-y-1">
                              {selectedSceneData.technical_requirements.camera.special_equipment.map((eq, index) => (
                                <div key={index} className="text-xs bg-blue-50 px-2 py-1 rounded">
                                  {eq}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Lightbulb className="h-4 w-4 text-yellow-600 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">Lighting</h4>
                            <p className="text-xs text-muted-foreground mb-2">{selectedSceneData.technical_requirements.lighting.type}</p>
                            <div className="space-y-1">
                              {selectedSceneData.technical_requirements.lighting.special_needs.map((need, index) => (
                                <div key={index} className="text-xs bg-yellow-50 px-2 py-1 rounded">
                                  {need}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Mic className="h-4 w-4 text-green-600 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">Sound</h4>
                            <div className="mb-2">
                              <p className="text-xs font-medium text-red-600">Challenges:</p>
                              {selectedSceneData.technical_requirements.sound.challenges.map((challenge, index) => (
                                <div key={index} className="text-xs text-muted-foreground">• {challenge}</div>
                              ))}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-green-600">Requirements:</p>
                              {selectedSceneData.technical_requirements.sound.requirements.map((req, index) => (
                                <div key={index} className="text-xs bg-green-50 px-2 py-1 rounded mb-1">
                                  {req}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Props & Vehicles */}
                {(selectedSceneData.props.length > 0 || selectedSceneData.vehicles.length > 0) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Palette className="h-5 w-5" />
                        <span>Props & Vehicles</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedSceneData.props.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3 text-sm">Props</h4>
                            <div className="space-y-3">
                              {selectedSceneData.props.map((prop, index) => (
                                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="font-medium text-sm">{prop.name}</h5>
                                    <Badge variant="outline" className="text-xs">
                                      {prop.type}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {prop.department} • Qty: {prop.quantity}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedSceneData.vehicles.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3 text-sm">Vehicles</h4>
                            <div className="space-y-3">
                              {selectedSceneData.vehicles.map((vehicle, index) => (
                                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <Truck className="h-4 w-4" />
                                    <div>
                                      <h5 className="font-medium text-sm">{vehicle.type}</h5>
                                      <p className="text-xs text-muted-foreground">
                                        Qty: {vehicle.quantity} • {vehicle.department}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Animals */}
                {selectedSceneData.animals.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PawPrint className="h-5 w-5" />
                        <span>Animals & Creatures</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedSceneData.animals.map((animal, index) => (
                          <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-sm capitalize">{animal.type}</h5>
                              <Badge variant="outline" className="text-xs">
                                {animal.species}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-muted-foreground">Quantity:</span>
                                <span className="ml-1 font-medium">{animal.quantity}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Wranglers:</span>
                                <span className="ml-1 font-medium">{animal.wranglers_required}</span>
                              </div>
                            </div>
                            {animal.special_notes && (
                              <p className="text-xs text-muted-foreground mt-2 italic">
                                {animal.special_notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Special Effects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Special Effects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {selectedSceneData.special_effects.practical.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm text-orange-600">Practical Effects</h4>
                          <div className="space-y-2">
                            {selectedSceneData.special_effects.practical.map((effect, index) => (
                              <div key={index} className="text-xs bg-orange-50 border border-orange-200 px-2 py-1 rounded">
                                {effect}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedSceneData.special_effects.visual.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm text-purple-600">Visual Effects</h4>
                          <div className="space-y-2">
                            {selectedSceneData.special_effects.visual.map((effect, index) => (
                              <div key={index} className="text-xs bg-purple-50 border border-purple-200 px-2 py-1 rounded">
                                {effect}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedSceneData.special_effects.stunts.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm text-red-600">Stunts</h4>
                          <div className="space-y-2">
                            {selectedSceneData.special_effects.stunts.map((stunt, index) => (
                              <div key={index} className="text-xs bg-red-50 border border-red-200 px-2 py-1 rounded">
                                {stunt}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedSceneData.special_effects.atmospherics.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm text-blue-600">Atmospherics</h4>
                          <div className="space-y-2">
                            {selectedSceneData.special_effects.atmospherics.map((atmo, index) => (
                              <div key={index} className="text-xs bg-blue-50 border border-blue-200 px-2 py-1 rounded">
                                {atmo}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Wardrobe & Makeup */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Wardrobe & Makeup</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 text-sm">Costumes</h4>
                        <div className="space-y-3">
                          {selectedSceneData.wardrobe_makeup.costumes.map((costume, index) => (
                            <div key={index} className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                              <h5 className="font-medium text-sm">{costume.character}</h5>
                              <div className="text-xs text-muted-foreground mt-1">
                                <div>Items: {costume.items.join(", ")}</div>
                                <div>Quantity: {costume.quantity}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 text-sm">Makeup</h4>
                        <div className="space-y-3">
                          {selectedSceneData.wardrobe_makeup.makeup.standard.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-green-600 mb-1">Standard</h5>
                              {selectedSceneData.wardrobe_makeup.makeup.standard.map((makeup, index) => (
                                <div key={index} className="text-xs bg-green-50 px-2 py-1 rounded mb-1">
                                  {makeup}
                                </div>
                              ))}
                            </div>
                          )}
                          {selectedSceneData.wardrobe_makeup.makeup.special.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-red-600 mb-1">Special</h5>
                              {selectedSceneData.wardrobe_makeup.makeup.special.map((makeup, index) => (
                                <div key={index} className="text-xs bg-red-50 px-2 py-1 rounded mb-1">
                                  {makeup}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 text-sm">Hair</h4>
                        <div className="space-y-2">
                          {selectedSceneData.wardrobe_makeup.hair.requirements.map((req, index) => (
                            <div key={index} className="text-xs bg-pink-50 border border-pink-200 px-2 py-1 rounded">
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Notes & Risk Assessment */}
                {selectedSceneData.special_notes.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <span>Special Notes & Considerations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedSceneData.special_notes.map((note, index) => (
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