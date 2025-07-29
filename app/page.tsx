"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { 
  Film, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  Calendar,
  Users,
  MapPin,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  Settings
} from "lucide-react";

export default function FilmProductionDashboard() {
  // Sample film production data
  const projectData = {
    title: "The Midnight Heist",
    totalScenes: 20,
    totalBudget: 8700000,
    totalScreenTime: "24:08",
    completedScenes: 12,
    riskLevel: "medium"
  };

  const quickStats = [
    {
      title: "Total Scenes",
      value: "20",
      description: "Across 15 locations",
      icon: Film,
      color: "text-blue-600"
    },
    {
      title: "Screen Time",
      value: "24:08",
      description: "Estimated runtime",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Total Budget",
      value: "$8.7M",
      description: "Production budget",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Risk Factors",
      value: "3",
      description: "High-risk departments",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  const recentActivity = [
    { scene: "Scene 15", status: "completed", department: "Camera", time: "2 hours ago" },
    { scene: "Scene 18", status: "in-progress", department: "Makeup", time: "4 hours ago" },
    { scene: "Scene 12", status: "review", department: "Special Effects", time: "6 hours ago" },
    { scene: "Scene 9", status: "completed", department: "Lighting", time: "1 day ago" }
  ];

  const departmentStats = [
    { name: "Camera", budget: 1200000, risk: "low", completion: 85 },
    { name: "Special Effects", budget: 2100000, risk: "high", completion: 60 },
    { name: "Makeup & Hair", budget: 450000, risk: "medium", completion: 75 },
    { name: "Art Direction", budget: 980000, risk: "low", completion: 90 },
    { name: "Stunts", budget: 750000, risk: "high", completion: 45 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Film className="h-8 w-8 text-brand-primary" />
                <h1 className="text-2xl font-bold text-foreground">Production Dashboard</h1>
              </div>
              <Badge variant="outline" className="ml-4">
                Active Project
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
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
          <Navigation />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Project Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{projectData.title}</h2>
              <p className="text-muted-foreground">
                Feature Film Production • {projectData.totalScenes} scenes • Estimated {projectData.totalScreenTime} runtime
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={projectData.riskLevel === "high" ? "destructive" : projectData.riskLevel === "medium" ? "outline" : "secondary"}>
                {projectData.riskLevel} risk
              </Badge>
              <Badge variant="secondary">
                {Math.round((projectData.completedScenes / projectData.totalScenes) * 100)}% Complete
              </Badge>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Scene Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Scene Breakdown Progress</span>
              </CardTitle>
              <CardDescription>
                Track progress across all scenes and departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((scene) => (
                  <div key={scene} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Scene {scene}</span>
                      <Badge variant="outline" className="text-xs">
                        {scene <= 3 ? "Completed" : scene === 4 ? "In Progress" : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{scene <= 2 ? "Studio A" : scene <= 4 ? "Location B" : "Studio C"}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <Button className="w-full" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Scene Analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Latest updates across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "completed" ? "bg-green-500" : 
                      activity.status === "in-progress" ? "bg-blue-500" : "bg-yellow-500"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.scene}</p>
                      <p className="text-xs text-muted-foreground">{activity.department}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Department Analysis</span>
            </CardTitle>
            <CardDescription>
              Budget allocation and risk assessment by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {departmentStats.map((dept, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{dept.name}</h4>
                    <Badge 
                      variant={dept.risk === "high" ? "destructive" : dept.risk === "medium" ? "outline" : "secondary"}
                      className="text-xs"
                    >
                      {dept.risk} risk
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-1">
                    ${(dept.budget / 1000000).toFixed(1)}M
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{dept.completion}% complete</span>
                    <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-primary transition-all"
                        style={{ width: `${dept.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t flex space-x-3">
              <Button variant="outline" className="flex-1">
                <TrendingUp className="h-4 w-4 mr-2" />
                Budget Analysis
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Optimizer
              </Button>
              <Button variant="outline" className="flex-1">
                <AlertCircle className="h-4 w-4 mr-2" />
                Risk Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Upcoming Milestones</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Scene 16-20 Principal Photography</span>
                  <Badge variant="outline">3 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Post-Production Planning</span>
                  <Badge variant="outline">1 week</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Final Budget Review</span>
                  <Badge variant="outline">2 weeks</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Critical Path Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Special Effects Scene 18</span>
                  <Badge variant="destructive">High Priority</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Makeup Prosthetics Prep</span>
                  <Badge variant="outline">Medium Priority</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Location Permits Review</span>
                  <Badge variant="outline">Medium Priority</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}