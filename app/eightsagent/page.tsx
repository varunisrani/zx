"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ProjectSelector } from "@/components/ProjectSelector";
import { useProject } from "@/lib/project-context";
import avatarEightsData from "../eightsagent/01-avatareighths-agent copy/output.json";
import blackPantherEightsData from "../eightsagent/01-blank-panthereighths-agent/output.json";
import { 
  Clock, 
  BarChart3,
  Timer,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Download,
  PieChart,
  Zap,
  Target,
  Wrench,
  Star
} from "lucide-react";

type AvatarEightsData = typeof avatarEightsData;
type BlackPantherEightsData = typeof blackPantherEightsData;
type AvatarScene = AvatarEightsData['eighthsAnalysisOutput']['sceneBySceneBreakdown'][0];
type BlackPantherScene = BlackPantherEightsData['eighthsAnalysisOutput']['sceneBySceneBreakdown'][0];

export default function EightsAnalysisPage() {
  const { selectedProject } = useProject();
  const [selectedScene, setSelectedScene] = useState(1);
  const [sortBy, setSortBy] = useState<'scene' | 'eighths' | 'complexity'>('scene');

  // Get data based on selected project
  const isAvatar = selectedProject === 'avatar';
  const data = isAvatar ? 
    avatarEightsData.eighthsAnalysisOutput : 
    blackPantherEightsData.eighthsAnalysisOutput;
  const scenes = data.sceneBySceneBreakdown;
  const summary = data.sceneAnalysisSummary;

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case "complex": return "destructive";
      case "standard": return "outline";
      case "simple": return "secondary";
      default: return "secondary";
    }
  };

  const getComplexityIcon = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case "complex": return <Zap className="h-3 w-3" />;
      case "standard": return <Target className="h-3 w-3" />;
      case "simple": return <CheckCircle className="h-3 w-3" />;
      default: return <CheckCircle className="h-3 w-3" />;
    }
  };

  const sortedScenes = [...scenes].sort((a, b) => {
    switch (sortBy) {
      case 'eighths':
        return b.eighthsCalculated - a.eighthsCalculated;
      case 'complexity':
        const complexityOrder = { complex: 3, standard: 2, simple: 1 };
        return (complexityOrder[b.complexityLevel as keyof typeof complexityOrder] || 0) - 
               (complexityOrder[a.complexityLevel as keyof typeof complexityOrder] || 0);
      default:
        return a.sceneNumber - b.sceneNumber;
    }
  });

  const selectedSceneData = scenes.find(s => s.sceneNumber === selectedScene);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-brand-primary" />
                <h1 className="text-2xl font-bold text-foreground">
                  {isAvatar ? 'Avatar' : 'Black Panther'} - Eighths Analysis
                </h1>
              </div>
              <Badge variant="outline" className="ml-4">
                {summary.totalScenesProcessed} Scenes Analyzed
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
                <Download className="h-4 w-4 mr-2" />
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
                Total Eighths
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{summary.totalEighthsCalculated}</div>
              <p className="text-xs text-muted-foreground">{summary.averageEighthsPerScene.toFixed(1)} avg per scene</p>
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
              <div className="text-2xl font-bold text-foreground">{summary.estimatedTotalScreenTime}</div>
              <p className="text-xs text-muted-foreground">{summary.totalPagesAnalyzed} script pages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Complex Scenes
              </CardTitle>
              <Zap className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {scenes.filter(s => s.complexityLevel === 'complex').length}
              </div>
              <p className="text-xs text-muted-foreground">High production complexity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Longest Scene
              </CardTitle>
              <Timer className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Math.max(...scenes.map(s => s.eighthsCalculated))}
              </div>
              <p className="text-xs text-muted-foreground">Longest scene eighths</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Scene Complexity Distribution</CardTitle>
              <CardDescription>Breakdown by complexity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-800">Simple Scenes</h4>
                    <Badge variant="outline">{scenes.filter(s => s.complexityLevel === 'simple').length} scenes</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Eighths:</span>
                      <span className="ml-1 font-medium">
                        {scenes.filter(s => s.complexityLevel === 'simple').reduce((sum, s) => sum + s.eighthsCalculated, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Time:</span>
                      <span className="ml-1 font-medium">0:45</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-yellow-800">Standard Scenes</h4>
                    <Badge variant="outline">{scenes.filter(s => s.complexityLevel === 'standard').length} scenes</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Eighths:</span>
                      <span className="ml-1 font-medium">
                        {scenes.filter(s => s.complexityLevel === 'standard').reduce((sum, s) => sum + s.eighthsCalculated, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Time:</span>
                      <span className="ml-1 font-medium">1:30</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-red-800">Complex Scenes</h4>
                    <Badge variant="outline">{scenes.filter(s => s.complexityLevel === 'complex').length} scenes</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Eighths:</span>
                      <span className="ml-1 font-medium">
                        {scenes.filter(s => s.complexityLevel === 'complex').reduce((sum, s) => sum + s.eighthsCalculated, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Time:</span>
                      <span className="ml-1 font-medium">3:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Production Recommendations</CardTitle>
              <CardDescription>Scheduling and risk analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-red-600">High Complexity Scenes</h4>
                <div className="flex flex-wrap gap-1">
                  {scenes.filter(s => s.complexityLevel === 'complex').map((scene, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      Scene {scene.sceneNumber}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-amber-600">Production Considerations</h4>
                <div className="space-y-2">
                  {scenes.filter(s => s.complexityLevel === 'complex').slice(0, 3).map((scene, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="h-3 w-3 text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        Scene {scene.sceneNumber}: {scene.complexityFactors.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-blue-600">Project Insights</h4>
                <div className="space-y-1">
                  <div className="text-xs bg-blue-50 px-2 py-1 rounded">
                    {isAvatar ? 'Heavy VFX requirements across most scenes' : 'Practical stunts and location work needed'}
                  </div>
                  <div className="text-xs bg-blue-50 px-2 py-1 rounded">
                    {isAvatar ? 'Performance capture technology essential' : 'Extensive costume and makeup departments'}
                  </div>
                  <div className="text-xs bg-blue-50 px-2 py-1 rounded">
                    {isAvatar ? 'Complex creature animation pipelines' : 'Choreographed action sequences'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scene List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Scene List</CardTitle>
                    <CardDescription>Click to view detailed timing breakdown</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={sortBy === 'scene' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('scene')}
                    >
                      Scene
                    </Button>
                    <Button
                      variant={sortBy === 'eighths' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('eighths')}
                    >
                      Eighths
                    </Button>
                    <Button
                      variant={sortBy === 'complexity' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('complexity')}
                    >
                      Complexity
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[800px] overflow-y-auto">
                  {sortedScenes.map((scene) => (
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
                            <Badge variant={getComplexityColor(scene.complexityLevel)} className="text-xs">
                              {scene.complexityLevel}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{scene.eighthsCalculated}/8</div>
                            <div className="text-xs text-muted-foreground">{scene.estimatedScreenTime}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{scene.sceneHeader}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <FileText className="h-3 w-3" />
                            <span>{scene.pageCount}p</span>
                          </span>
                          {getComplexityIcon(scene.complexityLevel)}
                          <span>{scene.complexityLevel}</span>
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
                          {selectedSceneData.pageCount} pages • {selectedSceneData.estimatedScreenTime} screen time • {selectedSceneData.eighthsCalculated} eighths
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getComplexityColor(selectedSceneData.complexityLevel)}>
                          {selectedSceneData.complexityLevel} complexity
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold">{selectedSceneData.eighthsCalculated}</div>
                        <div className="text-xs text-muted-foreground">Eighths Calculated</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold">{selectedSceneData.pageCount}</div>
                        <div className="text-xs text-muted-foreground">Page Count</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold">{selectedSceneData.estimatedScreenTime}</div>
                        <div className="text-xs text-muted-foreground">Screen Time</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold capitalize">{selectedSceneData.complexityLevel}</div>
                        <div className="text-xs text-muted-foreground">Complexity Level</div>
                      </div>
                    </div>

                    {/* Scene Content Preview */}
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-medium mb-2">Scene Content:</h4>
                      <p className="text-sm text-muted-foreground italic">
                        {selectedSceneData.sceneContent}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Complexity Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Complexity Factors</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedSceneData.complexityFactors.map((factor, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                          <Activity className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Timing Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Timing Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Timing Notes:</h4>
                      <p className="text-sm text-blue-700">{selectedSceneData.timingNotes}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Production Considerations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Wrench className="h-5 w-5" />
                      <span>Production Considerations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedSceneData.productionConsiderations.map((consideration, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-yellow-800">{consideration}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Timing Distribution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5" />
                      <span>Scene Timing Visualization</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Eighths Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {selectedSceneData.eighthsCalculated} of 8 eighths
                          </span>
                        </div>
                        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                            style={{ width: `${Math.min((selectedSceneData.eighthsCalculated / 8) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-lg font-bold text-green-800">
                            {Math.min(...scenes.map(s => s.eighthsCalculated))}
                          </div>
                          <div className="text-xs text-green-600">Shortest Scene</div>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-lg font-bold text-blue-800">
                            {(scenes.reduce((sum, s) => sum + s.eighthsCalculated, 0) / scenes.length).toFixed(1)}
                          </div>
                          <div className="text-xs text-blue-600">Average Length</div>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="text-lg font-bold text-red-800">
                            {Math.max(...scenes.map(s => s.eighthsCalculated))}
                          </div>
                          <div className="text-xs text-red-600">Longest Scene</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>Timing Risk Factors</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-800">
                          Complex scenes may require extended setup and shooting times
                        </span>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-800">
                          {isAvatar ? 'VFX-heavy scenes may experience rendering delays' : 'Action sequences require additional safety preparation'}
                        </span>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-800">
                          Weather-dependent exterior scenes may cause scheduling conflicts
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quality Control */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Quality Control Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <div className="text-xs font-medium">Data Validation</div>
                        <div className="text-xs text-muted-foreground">PASS</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <div className="text-xs font-medium">Timing Consistency</div>
                        <div className="text-xs text-muted-foreground">PASS</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <Target className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-xs font-medium">Industry Benchmark</div>
                        <div className="text-xs text-muted-foreground">ACCEPTABLE</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <Star className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                        <div className="text-xs font-medium">Confidence Score</div>
                        <div className="text-xs text-muted-foreground">85%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}