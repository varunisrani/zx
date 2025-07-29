"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ProjectSelector } from "@/components/ProjectSelector";
import { useProject } from "@/lib/project-context";
import avatarDepartmentData from "../departments/03-avatar-agent copy/output.json";
import blackPantherDepartmentData from "../departments/03-blank-pantherdepartment-agent/output.json";
import { 
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Camera,
  Lightbulb,
  Palette,
  Mic,
  Shirt,
  Scissors,
  Shield,
  BarChart3,
  Zap,
  PawPrint,
  Construction,
  Settings,
  Target
} from "lucide-react";

interface BuildItem {
  itemName: string;
  description: string;
  estimatedCost: number;
  complexity: string;
  deliveryDate: string;
}

// Removed interface definitions - using any types for flexible data structures

type AvatarDepartmentData = typeof avatarDepartmentData;
type BlackPantherDepartmentData = typeof blackPantherDepartmentData;

export default function DepartmentAnalysisPage() {
  const { selectedProject } = useProject();
  const [selectedDepartment, setSelectedDepartment] = useState("makeupHair");

  // Get data based on selected project
  const isAvatar = selectedProject === 'avatar';
  const data = isAvatar ? 
    avatarDepartmentData.departmentAnalysisOutput : 
    blackPantherDepartmentData.departmentAnalysisOutput;

  // Map department IDs to display information
  const departmentMeta = {
    makeupHair: { name: "Makeup & Hair", icon: Scissors, color: "text-pink-600" },
    wardrobeCostume: { name: "Wardrobe & Costume", icon: Shirt, color: "text-purple-600" },
    artDepartmentConstruction: { name: "Art Department & Construction", icon: Construction, color: "text-blue-600" },
    props: { name: "Props Department", icon: Palette, color: "text-green-600" },
    camera: { name: "Camera Department", icon: Camera, color: "text-yellow-600" },
    lighting: { name: "Lighting Department", icon: Lightbulb, color: "text-orange-600" },
    sound: { name: "Sound Department", icon: Mic, color: "text-teal-600" },
    specialEffects: { name: "Special Effects", icon: Zap, color: "text-red-600" },
    animalsCreatures: { name: "Animals & Creatures", icon: PawPrint, color: "text-amber-600" },
    stuntsSafety: { name: "Stunts & Safety", icon: Shield, color: "text-gray-600" }
  };

  const departments = Object.entries(data.departmentBreakdowns).map(([key, dept]) => ({
    id: key,
    ...departmentMeta[key as keyof typeof departmentMeta],
    ...dept,
    completion: Math.round((dept.totalDepartmentCost / dept.totalDepartmentCost) * 100) // Mock completion
  }));

  const getRiskColor = (totalCost: number) => {
    if (totalCost > 2000000) return "destructive";
    if (totalCost > 500000) return "outline";
    return "secondary";
  };

  const getRiskLevel = (totalCost: number) => {
    if (totalCost > 2000000) return "high";
    if (totalCost > 500000) return "medium";
    return "low";
  };

  const totalBudget = data.budgetSummary.grandTotalDepartmentBudget;
  const selectedDept = departments.find(d => d.id === selectedDepartment);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-brand-primary" />
                <h1 className="text-2xl font-bold text-foreground">
                  {isAvatar ? 'Avatar' : 'Black Panther'} - Department Analysis
                </h1>
              </div>
              <Badge variant="outline" className="ml-4">
                {departments.length} Departments
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
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
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budget
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${(totalBudget / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                {data.analysisOverview.totalDepartmentsAssessed} departments analyzed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Scenes Analyzed
              </CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.analysisOverview.totalScenesAnalyzed}
              </div>
              <p className="text-xs text-muted-foreground">Complete scene breakdown</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                High Cost Depts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {departments.filter(d => d.totalDepartmentCost > 2000000).length}
              </div>
              <p className="text-xs text-muted-foreground">Over $2M budget</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Budget Confidence
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.analysisOverview.budgetConfidenceLevel}
              </div>
              <p className="text-xs text-muted-foreground">Analysis confidence</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Department List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Click to view detailed breakdown</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[800px] overflow-y-auto">
                  {departments.map((dept) => (
                    <div 
                      key={dept.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 border-l-2 ${
                        selectedDepartment === dept.id ? 'border-brand-primary bg-muted/30' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedDepartment(dept.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <dept.icon className={`h-4 w-4 ${dept.color}`} />
                          <span className="font-medium text-sm">{dept.name}</span>
                        </div>
                        <Badge variant={getRiskColor(dept.totalDepartmentCost)} className="text-xs">
                          {getRiskLevel(dept.totalDepartmentCost)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Budget</span>
                          <span className="font-medium">${(dept.totalDepartmentCost / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Scenes</span>
                          <span className="font-medium">{dept.totalScenes || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Crew</span>
                          <span className="font-medium">{Object.values(dept.crewRequirements || {}).reduce((a: number, b: number) => a + (typeof b === 'number' ? b : 0), 0)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Details */}
          <div className="lg:col-span-2">
            {selectedDept && (
              <div className="space-y-6">
                {/* Department Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <selectedDept.icon className={`h-8 w-8 ${selectedDept.color}`} />
                        <div>
                          <CardTitle className="text-xl">{selectedDept.name}</CardTitle>
                          <CardDescription>
                            {Object.values(selectedDept.crewRequirements || {}).reduce((a: number, b: number) => a + (typeof b === 'number' ? b : 0), 0)} crew members
                            {selectedDept.totalScenes && ` • ${selectedDept.totalScenes} scenes`}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getRiskColor(selectedDept.totalDepartmentCost)} className="text-sm">
                        {getRiskLevel(selectedDept.totalDepartmentCost)} cost
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">
                          ${(selectedDept.totalDepartmentCost / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-xs text-muted-foreground">Total Budget</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">
                          {selectedDept.totalScenes || 'N/A'}
                        </p>
                        <p className="text-xs text-muted-foreground">Total Scenes</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">
                          {Object.values(selectedDept.crewRequirements || {}).reduce((a: number, b: number) => a + (typeof b === 'number' ? b : 0), 0)}
                        </p>
                        <p className="text-xs text-muted-foreground">Crew Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Crew Requirements */}
                {selectedDept.crewRequirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Crew Requirements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(selectedDept.crewRequirements).map(([role, count]) => (
                          <div key={role} className="p-3 bg-muted/30 rounded-lg">
                            <div className="text-lg font-bold">{count as number}</div>
                            <div className="text-sm text-muted-foreground capitalize">
                              {role.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Major Builds/Equipment */}
                {(selectedDept as any).majorBuilds && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Major Builds & Construction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(selectedDept as any).majorBuilds.map((build: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{build.item}</h4>
                              <Badge variant={build.complexity === 'extreme' ? 'destructive' : 
                                            build.complexity === 'complex' ? 'outline' : 'secondary'}>
                                {build.complexity}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Cost: ${build.estimatedCost.toLocaleString()}
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-1">Materials Needed:</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {build.materialsNeeded?.map((material: string, idx: number) => (
                                  <div key={idx} className="text-xs bg-blue-50 px-2 py-1 rounded">
                                    {material}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Hero Props */}
                {(selectedDept as any).heroProps && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Hero Props</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(selectedDept as any).heroProps.map((prop: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{prop.item || prop.propName}</h4>
                              <Badge variant="outline" className="text-xs">
                                {prop.category || 'N/A'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {prop.specifications || prop.description}
                            </p>
                            <p className="text-sm font-medium">
                              Cost: ${prop.estimatedCost.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Equipment Packages */}
                {(selectedDept as any).equipmentPackages && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Equipment Packages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(selectedDept as any).equipmentPackages.map((pkg: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{pkg.package || pkg.packageName}</h4>
                              <div className="text-sm font-medium">
                                ${(pkg.rentalCost || pkg.dailyRate || 0).toLocaleString()}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {pkg.scenes || 'N/A'} scenes
                            </p>
                            <div>
                              <h5 className="text-sm font-medium mb-1">Special Requirements:</h5>
                              {(pkg.specialRequirements || pkg.itemList || []).map((req: string, idx: number) => (
                                <div key={idx} className="text-xs bg-yellow-50 px-2 py-1 rounded mb-1">
                                  {req}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Lighting Setups */}
                {(selectedDept as any).lightingSetups && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Lighting Setups</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(selectedDept as any).lightingSetups.map((setup: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{setup.setup || setup.setupName}</h4>
                              <div className="text-sm font-medium">
                                ${(setup.equipmentCost || 0).toLocaleString()}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Scenes:</span>
                                <span className="ml-1 font-medium">{setup.scenes || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Power:</span>
                                <span className="ml-1 font-medium">{setup.powerRequirements || setup.powerRequirement}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recording Requirements */}
                {(selectedDept as any).recordingRequirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recording Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(selectedDept as any).recordingRequirements.map((req: any, index: number) => (
                          <div key={index} className="p-3 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium capitalize">{req.type}</h4>
                              <Badge variant={req.complexity === 'complex' ? 'destructive' : 'secondary'}>
                                {req.complexity}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Scenes: {req.scenes || 'N/A'}</span>
                              <span className="font-medium">${(req.equipmentCost || 0).toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* anys Required */}
                {(selectedDept as any).effectsRequired && (
                  <Card>
                    <CardHeader>
                      <CardTitle>anys Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(selectedDept as any).effectsRequired.map((effect: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{effect.effect || effect.effectName}</h4>
                              <Badge variant={effect.complexity === 'extreme' ? 'destructive' : 
                                            effect.complexity === 'complex' ? 'outline' : 'secondary'}>
                                {effect.complexity}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">Scenes:</span>
                                <span className="ml-1 font-medium">{effect.scenes || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cost:</span>
                                <span className="ml-1 font-medium">${(effect.estimatedCost || 0).toLocaleString()}</span>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2">Safety Requirements:</h5>
                              <div className="space-y-1">
                                {(effect.safetyRequirements || []).map((safety: string, idx: number) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <Shield className="h-3 w-3 text-red-600" />
                                    <span className="text-xs">{safety}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Animal Requirements */}
                {(selectedDept as any).animalRequirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Animal Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(selectedDept as any).animalRequirements.map((animal: any, index: number) => (
                          <div key={index} className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{animal.type || animal.animalType}</h4>
                              <div className="text-sm font-medium">
                                ${(animal.estimatedCost || 0).toLocaleString()}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">Count:</span>
                                <span className="ml-1 font-medium">{animal.count}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Scenes:</span>
                                <span className="ml-1 font-medium">{animal.scenes || animal.count || 'N/A'}</span>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-1">Handler Requirements:</h5>
                              <p className="text-xs text-muted-foreground">{animal.handlerRequirements || animal.trainingLevel}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Stunt Requirements */}
                {(selectedDept as any).stuntRequirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Stunt Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(selectedDept as any).stuntRequirements.map((stunt: any, index: number) => (
                          <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{stunt.type || stunt.stuntType}</h4>
                              <Badge variant={(stunt.riskLevel || stunt.complexity) === 'extreme' ? 'destructive' : 
                                            (stunt.riskLevel || stunt.complexity) === 'high' ? 'outline' : 'secondary'}>
                                {stunt.riskLevel || stunt.complexity} risk
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">Scenes:</span>
                                <span className="ml-1 font-medium">{stunt.scenes || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Performers:</span>
                                <span className="ml-1 font-medium">{stunt.performersNeeded || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cost:</span>
                                <span className="ml-1 font-medium">${(stunt.estimatedCost || 0).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Special Effects Makeup */}
                {(selectedDept as any).specialEffectsMakeups && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Special Effects Makeup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(selectedDept as any).specialEffectsMakeups.map((makeup: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{makeup.type || makeup.characterName}</h4>
                              <Badge variant={makeup.complexity === 'complex' ? 'destructive' : 'secondary'}>
                                {makeup.complexity}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Scenes Required:</span>
                                <span className="ml-1 font-medium">{makeup.scenesRequired || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cost:</span>
                                <span className="ml-1 font-medium">${(makeup.estimatedCost || 0).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Period Costumes */}
                {(selectedDept as any).periodCostumes && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Period Costumes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(selectedDept as any).periodCostumes.map((costume: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{costume.character}</h4>
                              <Badge variant={costume.complexity === 'complex' ? 'destructive' : 'secondary'}>
                                {costume.complexity}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Period:</span>
                                <span className="ml-1 font-medium">{costume.period}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cost:</span>
                                <span className="ml-1 font-medium">${(costume.estimatedCost || 0).toLocaleString()}</span>
                              </div>
                            </div>
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