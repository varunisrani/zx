"use client"

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ProjectSelector } from "@/components/ProjectSelector";
import { useProject } from "@/lib/project-context";

// Black Panther imports
import blackPantherComplianceData from "./blank-panther/complience.json";
import blackPantherResourceData from "./blank-panther/resource-logistic.json";
import blackPantherOptimizationData from "./blank-panther/Optimizescenario.json";
import { 
  Calendar, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  MapPin, 
  DollarSign, 
  Target, 
  Zap, 
  BarChart3, 
  Settings, 
  Briefcase, 
  TrendingUp, 
  Filter, 
  Search, 
  Download, 
  FileText, 
  Wrench, 
  Globe, 
  Timer, 
  Star, 
  Activity, 
  Eye, 
  Layers,
  PieChart,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Info,
  Lightbulb
} from "lucide-react";

type Section = 'compliance' | 'resources' | 'optimization';

export default function SchedulePage() {
  const [activeSection, setActiveSection] = useState<Section>('compliance');
  const { selectedProject } = useProject();

  // Use Black Panther data
  const compliance = blackPantherComplianceData.complianceConstraintsOutput;
  const resources = blackPantherResourceData.resourceLogisticsOutput;
  const optimization = blackPantherOptimizationData.optimizationScenarioOutput;

  const getSeverityColor = (severity: string): "destructive" | "secondary" | "outline" => {
    switch (severity.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getSeverityIcon = (severity: string): React.ReactElement => {
    switch (severity.toLowerCase()) {
      case "high": return <AlertTriangle className="h-3 w-3" />;
      case "medium": return <Clock className="h-3 w-3" />;
      case "low": return <CheckCircle className="h-3 w-3" />;
      default: return <Info className="h-3 w-3" />;
    }
  };

  const renderComplianceSection = () => (
    <div className="space-y-6">
      {/* Compliance Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compliance Status
            </CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{compliance.complianceStatus}</div>
            <p className="text-xs text-muted-foreground">Confidence: {(compliance.confidence * 100).toFixed(0)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Hard Constraints
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{compliance.hardConstraints.length}</div>
            <p className="text-xs text-muted-foreground">Critical violations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Soft Constraints
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{compliance.softConstraints.length}</div>
            <p className="text-xs text-muted-foreground">Flexible violations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Risk Level
            </CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{compliance.riskAssessment.length}</div>
            <p className="text-xs text-muted-foreground">Identified risks</p>
          </CardContent>
        </Card>
      </div>

      {/* Constraint Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Hard Constraints</span>
            </CardTitle>
            <CardDescription>Critical compliance requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(compliance.hardConstraints || []).map((constraint, index) => (
              <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-red-800">{constraint.constraintId}</h4>
                  <Badge variant="destructive" className="text-xs">
                    {constraint.type}
                  </Badge>
                </div>
                <p className="text-sm text-red-700 mb-2">{constraint.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-red-600">Applies to:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {constraint.applicableTo.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-red-600">Violation:</span>
                    <span className="ml-1 text-red-700">{constraint.violation}</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-red-600">Flexibility:</span>
                    <span className="ml-1 text-red-700">{constraint.flexibility}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span>Soft Constraints</span>
            </CardTitle>
            <CardDescription>Flexible compliance recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {compliance.softConstraints.map((constraint, index) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-yellow-800">{constraint.constraintId}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {constraint.type}
                  </Badge>
                </div>
                <p className="text-sm text-yellow-700 mb-2">{constraint.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-yellow-600">Applies to:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {constraint.applicableTo.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-yellow-600">Flexibility:</span>
                    <span className="ml-1 text-yellow-700">{constraint.flexibility}</span>
                  </div>
                  {constraint.penalty && (
                    <div className="text-xs">
                      <span className="font-medium text-yellow-600">Penalty:</span>
                      <span className="ml-1 text-yellow-700">{constraint.penalty}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Risk Assessment</span>
          </CardTitle>
          <CardDescription>Identified production risks and mitigation strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {compliance.riskAssessment.map((risk, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium">{risk.riskId}</h4>
                  <Badge variant={getSeverityColor(risk.severity)}>
                    {getSeverityIcon(risk.severity)}
                    <span className="ml-1">{risk.severity}</span>
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs">
                  {risk.category}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Description:</span>
                  <p className="text-sm mt-1">{risk.description}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Impact:</span>
                  <p className="text-sm mt-1">{risk.impact}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-3 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Probability:</span>
                  <span className="ml-1 font-bold">{(risk.probability * 100).toFixed(0)}%</span>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-muted-foreground">Mitigation:</span>
                <p className="text-sm mt-1 text-green-700 bg-green-50 p-2 rounded border border-green-200">
                  {risk.mitigation}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Compliance Recommendations</span>
          </CardTitle>
          <CardDescription>Priority actions for compliance management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {compliance.complianceRecommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant={rec.priority === 'HIGH' ? 'destructive' : 'secondary'} className="text-xs">
                    {rec.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {rec.category}
                  </Badge>
                </div>
              </div>
              <h4 className="font-medium mb-2">Recommendation:</h4>
              <p className="text-sm text-muted-foreground mb-3">{rec.recommendation}</p>
              <div>
                <span className="text-sm font-medium text-red-600">Impact if ignored:</span>
                <p className="text-sm text-red-700 mt-1">{rec.impactIfIgnored}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderResourcesSection = () => (
    <div className="space-y-6">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Status
            </CardTitle>
            <Activity className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{resources.systemStatus}</div>
            <p className="text-xs text-muted-foreground">Confidence: {(resources.confidence * 100).toFixed(0)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cast Members
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{resources.dataProcessingSummary.castMembersAnalyzed}</div>
            <p className="text-xs text-muted-foreground">Analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conflicts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{resources.dataProcessingSummary.conflictsIdentified}</div>
            <p className="text-xs text-muted-foreground">Critical issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${resources.logisticalCostEstimates.finalBudgetEstimate.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Final estimate</p>
          </CardContent>
        </Card>
      </div>

      {/* Cast Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Principal Cast Analysis</span>
          </CardTitle>
          <CardDescription>Detailed breakdown of principal cast scheduling and costs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {resources.preliminaryDoodReport.principals.map((cast, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg">{cast.characterName}</h4>
                  <p className="text-muted-foreground">{cast.actor}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ${cast.costProjection.totalCost.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Total cost</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xl font-bold text-blue-800">{cast.totalEstimatedDays}</div>
                  <div className="text-xs text-blue-600">Work Days</div>
                </div>
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xl font-bold text-green-800">{cast.holdDays}</div>
                  <div className="text-xs text-green-600">Hold Days</div>
                </div>
                <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-xl font-bold text-purple-800">
                    {(cast.schedulingWindow.utilizationRate * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-purple-600">Utilization</div>
                </div>
                <div className="text-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="text-xl font-bold text-orange-800">${cast.costProjection.dailyRate.toLocaleString()}</div>
                  <div className="text-xs text-orange-600">Daily Rate</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium mb-2">Scheduling Window:</h5>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>Start: {cast.schedulingWindow.start}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span>End: {cast.schedulingWindow.end}</span>
                    <span className="text-muted-foreground">({cast.schedulingWindow.availableDays} days available)</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Scene Breakdown:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(cast.sceneBreakdown || []).map((scene, idx) => (
                      <div key={idx} className="p-2 bg-muted/30 rounded text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Scene {scene.sceneId}</span>
                          <span className="text-muted-foreground">{scene.estimatedHours}h</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {scene.location}
                        </div>
                        {(scene.specialRequirements || []).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(scene.specialRequirements || []).map((req, reqIdx) => (
                              <Badge key={reqIdx} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {(cast.constraints || []).length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Constraints:</h5>
                    <div className="space-y-1">
                      {(cast.constraints || []).map((constraint, idx) => (
                        <div key={idx} className="text-sm bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                          {constraint}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resource Conflicts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Resource Conflicts</span>
          </CardTitle>
          <CardDescription>Critical conflicts requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resources.resourceAvailabilityMatrix.castAvailabilityConflicts.map((conflict, index) => (
            <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-red-800">{conflict.conflictId}</h4>
                <Badge variant="destructive" className="text-xs">
                  {conflict.severity}
                </Badge>
              </div>
              <p className="text-sm text-red-700 mb-2">{conflict.description}</p>
              <div className="mb-2">
                <span className="text-sm font-medium text-red-600">Impact:</span>
                <p className="text-sm text-red-700">{conflict.impact}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-green-600">Resolution:</span>
                <p className="text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200 mt-1">
                  {conflict.resolution}
                </p>
              </div>
            </div>
          ))}

          {resources.resourceAvailabilityMatrix.crewResourceConflicts.map((conflict, index) => (
            <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-orange-800">{conflict.conflictId}</h4>
                <Badge variant="secondary" className="text-xs">
                  {conflict.severity}
                </Badge>
              </div>
              <p className="text-sm text-orange-700 mb-2">{conflict.description}</p>
              <div className="mb-2">
                <span className="text-sm font-medium text-orange-600">Impact:</span>
                <p className="text-sm text-orange-700">{conflict.impact}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-green-600">Resolution:</span>
                <p className="text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200 mt-1">
                  {conflict.resolution}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Location Logistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-purple-600" />
            <span>Location Logistics Breakdown</span>
          </CardTitle>
          <CardDescription>Detailed analysis of filming locations and logistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {((resources as any).locationLogisticsBreakdown?.locationEfficiency?.detailed_location_analysis || []).map((location: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold">{location.name}</h4>
                  <p className="text-sm text-muted-foreground">{location.locationId}</p>
                </div>
                <div className="text-right">
                  <Badge variant={location.logisticalComplexity === 'HIGH' ? 'destructive' : 'secondary'}>
                    {location.logisticalComplexity}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{location.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Travel Time:</span>
                  <p className="text-sm font-bold">{location.travelTime}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Setup/Strike:</span>
                  <p className="text-sm font-bold">{location.setupStrikeHours}h</p>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Key Challenges:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {location.keyChallenges.map((challenge: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <AlertTriangle className="h-3 w-3 text-yellow-600" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Logistical Cost Estimates</span>
          </CardTitle>
          <CardDescription>Comprehensive budget breakdown for production logistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">
                ${resources.logisticalCostEstimates.castCosts.total.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">Cast Costs</div>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-800">
                ${resources.logisticalCostEstimates.crewCosts.total.toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Crew Costs</div>
            </div>
            <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="text-2xl font-bold text-purple-800">
                ${resources.logisticalCostEstimates.equipmentCosts.total.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">Equipment Costs</div>
            </div>
            <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="text-2xl font-bold text-orange-800">
                ${resources.logisticalCostEstimates.locationCosts.total.toLocaleString()}
              </div>
              <div className="text-sm text-orange-600">Location Costs</div>
            </div>
          </div>

          <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="text-3xl font-bold text-green-800 mb-2">
              ${resources.logisticalCostEstimates.finalBudgetEstimate.toLocaleString()}
            </div>
            <div className="text-green-600">Final Budget Estimate</div>
            <div className="text-sm text-muted-foreground mt-1">
              Includes ${resources.logisticalCostEstimates.contingencyRecommendation.toLocaleString()} contingency
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOptimizationSection = () => (
    <div className="space-y-6">
      {/* Optimization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Optimization Status
            </CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{optimization.optimizationStatus}</div>
            <p className="text-xs text-muted-foreground">Confidence: {((optimization.confidence || 0) * 100).toFixed(0)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scenarios Generated
            </CardTitle>
            <Layers className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Object.keys(optimization.optimizedScheduleProposals || {}).length}
            </div>
            <p className="text-xs text-muted-foreground">Schedule options</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Solutions Evaluated
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {(optimization.solutionsEvaluated || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Combinations tested</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Iterations
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {(optimization.iterationsCompleted || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Scenario Comparison Matrix</span>
          </CardTitle>
          <CardDescription>Comparative analysis of all optimization scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Metric</th>
                  <th className="text-center p-2 font-medium">Revolutionary Innovation</th>
                  <th className="text-center p-2 font-medium">Cost Efficient</th>
                  <th className="text-center p-2 font-medium">Risk Mitigation</th>
                  <th className="text-center p-2 font-medium">Mocap Efficiency</th>
                  <th className="text-center p-2 font-medium">Best</th>
                </tr>
              </thead>
              <tbody>
                {(optimization.scenarioComparison?.comparisonMatrix || []).map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="p-2 font-medium">{row.metric.replace(/_/g, ' ')}</td>
                    <td className="text-center p-2">
                      {typeof (row as any).SCENARIO_001_revolutionary_innovation_optimized === 'number' ? 
                        (row as any).SCENARIO_001_revolutionary_innovation_optimized.toLocaleString() : 
                        (row as any).SCENARIO_001_revolutionary_innovation_optimized || 'N/A'
                      }
                    </td>
                    <td className="text-center p-2">
                      {typeof (row as any).SCENARIO_002_cost_efficient_blockbuster === 'number' ? 
                        (row as any).SCENARIO_002_cost_efficient_blockbuster.toLocaleString() : 
                        (row as any).SCENARIO_002_cost_efficient_blockbuster || 'N/A'
                      }
                    </td>
                    <td className="text-center p-2">
                      {typeof (row as any).SCENARIO_003_risk_mitigation === 'number' ? 
                        (row as any).SCENARIO_003_risk_mitigation.toLocaleString() : 
                        (row as any).SCENARIO_003_risk_mitigation || 'N/A'
                      }
                    </td>
                    <td className="text-center p-2">
                      {typeof (row as any).SCENARIO_004_mocap_navi_efficiency === 'number' ? 
                        (row as any).SCENARIO_004_mocap_navi_efficiency.toLocaleString() : 
                        (row as any).SCENARIO_004_mocap_navi_efficiency || 'N/A'
                      }
                    </td>
                    <td className="text-center p-2">
                      <Badge variant="outline" className="text-xs">
                        {((row as any).bestScenario || 'N/A').toString().replace(/_/g, ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Tradeoff Analysis:</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div>Schedule vs Cost: {(optimization.scenarioComparison as any)?.tradeoffAnalysis?.scheduleLength_vs_cost || (optimization.scenarioComparison as any)?.tradeoffAnalysis?.Speed_vs_Cost || 'N/A'}</div>
              <div>Risk vs Efficiency: {(optimization.scenarioComparison as any)?.tradeoffAnalysis?.riskMitigation_vs_efficiency || (optimization.scenarioComparison as any)?.tradeoffAnalysis?.Risk_vs_Schedule || 'N/A'}</div>
              <div>Cast Efficiency vs Compactness: {(optimization.scenarioComparison as any)?.tradeoffAnalysis?.castEfficiency_vs_compactness || (optimization.scenarioComparison as any)?.tradeoffAnalysis?.Innovation_vs_Cost || 'N/A'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(optimization.optimizedScheduleProposals || {}).map(([key, scenario]: [string, any]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{scenario.name}</span>
                <Badge variant="outline" className="text-xs">
                  {scenario.optimizationPriority.replace(/_/g, ' ')}
                </Badge>
              </CardTitle>
              <CardDescription>{scenario.scenarioId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xl font-bold text-blue-800">{scenario.totalShootDays}</div>
                  <div className="text-xs text-blue-600">Shoot Days</div>
                </div>
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xl font-bold text-green-800">{scenario.totalCalendarDays}</div>
                  <div className="text-xs text-green-600">Calendar Days</div>
                </div>
              </div>

              {scenario.estimatedCosts && (
                <div className="space-y-2">
                  <h5 className="font-medium">Cost Breakdown:</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Cast:</span>
                      <span>${(scenario.estimatedCosts?.castCosts || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crew:</span>
                      <span>${(scenario.estimatedCosts?.crewCosts || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment:</span>
                      <span>${(scenario.estimatedCosts?.equipmentCosts || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Locations:</span>
                      <span>${(scenario.estimatedCosts?.locationCosts || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-1">
                      <span>Total:</span>
                      <span>${(scenario.estimatedCosts?.finalBudgetProjection || 0).toLocaleString()}</span>
                    </div>
                    {scenario.estimatedCosts?.savingsVsBaseline && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings:</span>
                        <span>${(scenario.estimatedCosts?.savingsVsBaseline || 0).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {scenario.qualityMetrics && (
                <div className="space-y-2">
                  <h5 className="font-medium">Quality Metrics:</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>Schedule Compactness:</span>
                      <span>{(scenario.qualityMetrics.scheduleCompactness * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resource Utilization:</span>
                      <span>{(scenario.qualityMetrics.resourceUtilizationScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cast Efficiency:</span>
                      <span>{(scenario.qualityMetrics.castEfficiencyScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Score:</span>
                      <span>{(scenario.qualityMetrics.riskScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-center">
                    <div className="text-lg font-bold text-green-800">
                      {(scenario.qualityMetrics.overallQualityScore * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-green-600">Overall Quality Score</div>
                  </div>
                </div>
              )}

              {scenario.productionPhases && (
                <div className="space-y-2">
                  <h5 className="font-medium">Production Phases:</h5>
                  <div className="space-y-2">
                    {(scenario.productionPhases || []).map((phase: any, idx: number) => (
                      <div key={idx} className="p-2 bg-muted/30 rounded text-sm">
                        <div className="font-medium">{phase.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {phase.startDate} → {phase.endDate} ({phase.shootDays} shoot days)
                        </div>
                        <div className="text-xs">
                          Location: {phase.location} | Cost: ${phase.estimatedCost.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resource Utilization Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-purple-600" />
            <span>Resource Utilization Analysis</span>
          </CardTitle>
          <CardDescription>Efficiency metrics across all resource categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">
                {(((optimization as any).resourceUtilizationAnalysis?.utilizationEfficiency?.cast?.overall || 0.85) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-blue-600">Cast Utilization</div>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-800">
                {(((optimization as any).resourceUtilizationAnalysis?.utilizationEfficiency?.equipment?.overall || 0.92) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-green-600">Equipment Utilization</div>
            </div>
            <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="text-2xl font-bold text-purple-800">
                {(((optimization as any).resourceUtilizationAnalysis?.utilizationEfficiency?.locations?.overall || 0.78) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-purple-600">Location Utilization</div>
            </div>
            <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="text-2xl font-bold text-orange-800">
                {(((optimization as any).resourceUtilizationAnalysis?.utilizationEfficiency?.crew?.overall || 0.88) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-orange-600">Crew Utilization</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Optimization Opportunities:</h4>
            {((optimization as any).resourceUtilizationAnalysis?.optimizationOpportunities || []).map((opportunity: any, index: number) => (
              <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {(opportunity.category || 'general').replace(/_/g, ' ')}
                  </Badge>
                  <div className="text-green-600 font-bold">
                    ${(opportunity.potential_savings || 0).toLocaleString()} savings
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-medium">Opportunity:</span>
                    <span className="ml-1">{opportunity.opportunity || 'Optimization opportunity'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Improvement:</span>
                    <span className="ml-1">{opportunity.improvement || 'Performance improvement'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <span>Implementation Recommendations</span>
          </CardTitle>
          <CardDescription>Priority actions for schedule optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(optimization.implementationRecommendations || []).map((rec: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={rec.priority === 'HIGH' ? 'destructive' : 'secondary'} className="text-xs">
                  {rec.priority || 'MEDIUM'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {(rec.category || 'general').replace(/_/g, ' ')}
                </Badge>
              </div>
              <h4 className="font-medium mb-2">{rec.recommendation || 'Implementation recommendation'}</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Rationale:</span>
                  <p className="text-muted-foreground">{rec.rationale || 'Rationale not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-green-600">Implementation:</span>
                  <p className="text-green-700">{rec.implementation || 'Implementation details not available'}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-brand-primary" />
                <h1 className="text-2xl font-bold text-foreground">
                  Black Panther - Production Schedule
                </h1>
              </div>
              <Badge variant="outline" className="ml-4">
                Multi-Phase Analysis
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
                Export Analysis
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

      {/* Project Selection */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-3">
          <ProjectSelector />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Section Navigation */}
        <div className="flex items-center justify-center space-x-1 bg-muted/30 rounded-lg p-1 mb-8 max-w-2xl mx-auto">
          <Button
            variant={activeSection === 'compliance' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('compliance')}
            className="flex items-center space-x-2"
          >
            <Shield className="h-4 w-4" />
            <span>Compliance Constraints</span>
          </Button>
          <Button
            variant={activeSection === 'resources' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('resources')}
            className="flex items-center space-x-2"
          >
            <Briefcase className="h-4 w-4" />
            <span>Resource Logistics</span>
          </Button>
          <Button
            variant={activeSection === 'optimization' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('optimization')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Optimization Scenarios</span>
          </Button>
        </div>

        {/* Section Content */}
        {activeSection === 'compliance' && renderComplianceSection()}
        {activeSection === 'resources' && renderResourcesSection()}
        {activeSection === 'optimization' && renderOptimizationSection()}
      </div>
    </div>
  );
}