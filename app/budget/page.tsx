"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ProjectSelector } from "@/components/ProjectSelector";
import { useProject } from "@/lib/project-context";

// Black Panther imports
import blackPantherCashflowData from "./blank-pather/cashflow.json";
import blackPantherLabourData from "./blank-pather/labour-cost.json";
import blackPantherBudgetAggregatorData from "./blank-pather/budget-agrigator.json";
import blackPantherEquipmentData from "./blank-pather/equipment-prcing.json";
import blackPantherInsuranceData from "./blank-pather/insurence-callator.json";
import blackPantherLocationData from "./blank-pather/location-cost-optimizer.json";
import blackPantherPostProductionData from "./blank-pather/postproduciton.json";
import blackPantherScheduleOptimizerData from "./blank-pather/schedule-optimizer.json";
import blackPantherTaxIncentiveData from "./blank-pather/text-incetive.json";
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  MapPin, 
  BarChart3, 
  Filter, 
  Search, 
  Download, 
  FileText, 
  Zap, 
  Activity, 
  ArrowRight,
  Shield,
  Camera,
  Film,
  Lightbulb,
  PieChart,
  Wrench,
  Globe,
  Briefcase,
  Calculator,
  Percent,
  Building,
  Truck,
  HardDrive,
  Star,
  Calendar
} from "lucide-react";

// Type definitions
interface CrewDepartment {
  baseWages: number;
}

// Using flexible any types since data structures vary between projects

type Section = 'cashflow' | 'labour' | 'aggregator' | 'equipment' | 'insurance' | 'locations' | 'postproduction' | 'tax';

export default function BudgetPage() {
  const [activeSection, setActiveSection] = useState<Section>('cashflow');
  const { selectedProject } = useProject();

  // Use Black Panther data
  const cashflow = blackPantherCashflowData.cashFlowModelOutput;
  const labour = blackPantherLabourData.laborModelOutput;
  const aggregator = blackPantherBudgetAggregatorData.aggregatorOutput;
  const equipment = blackPantherEquipmentData.equipmentModelOutput;
  const insurance = blackPantherInsuranceData.insuranceModelOutput;
  const locations = blackPantherLocationData.locationModelOutput;
  const postProduction = blackPantherPostProductionData.postModelOutput;
  const scheduleOptimizer = blackPantherScheduleOptimizerData.scheduleModelOutput;
  const taxIncentives = blackPantherTaxIncentiveData.taxModelOutput;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "high": case "extreme": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const renderCashflowSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Peak Funding
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(cashflow.executiveSummary.peakFunding)}
            </div>
            <p className="text-xs text-muted-foreground">Maximum required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Project IRR
            </CardTitle>
            <Percent className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {(cashflow.executiveSummary.projectIRR * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Internal rate of return</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Project NPV
            </CardTitle>
            <Calculator className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(cashflow.executiveSummary.projectNPV)}
            </div>
            <p className="text-xs text-muted-foreground">Net present value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payback Period
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{cashflow.executiveSummary.paybackPeriod}</div>
            <p className="text-xs text-muted-foreground">Years</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Funding Drawdown Schedule</span>
          </CardTitle>
          <CardDescription>Investment funding timeline by source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Studio Financing */}
            <div className="space-y-4">
              <h4 className="font-medium text-blue-600">Studio Financing</h4>
              {(cashflow.fundingDrawdown as any).studioFinancing ? 
                Object.entries((cashflow.fundingDrawdown as any).studioFinancing).map(([period, amount]) => (
                  <div key={period} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium">{period.replace('_', ' ').replace('q', 'Q')}</span>
                    <span className="text-sm font-bold text-blue-800">{formatCurrency(amount as number)}</span>
                  </div>
                )) : <div className="text-sm text-muted-foreground">No studio financing data</div>
              }
            </div>

            {/* Bank Credit */}
            <div className="space-y-4">
              <h4 className="font-medium text-green-600">Bank Credit</h4>
              {(cashflow.fundingDrawdown as any).bankCredit ? 
                Object.entries((cashflow.fundingDrawdown as any).bankCredit).map(([period, amount]) => (
                  <div key={period} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium">{period.replace('_', ' ').replace('q', 'Q')}</span>
                    <span className="text-sm font-bold text-green-800">{formatCurrency(amount as number)}</span>
                  </div>
                )) : <div className="text-sm text-muted-foreground">No bank credit data</div>
              }
            </div>

            {/* Equity */}
            <div className="space-y-4">
              <h4 className="font-medium text-purple-600">Equity</h4>
              {(cashflow.fundingDrawdown as any).equity ? 
                Object.entries((cashflow.fundingDrawdown as any).equity).map(([period, amount]) => (
                  <div key={period} className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <span className="text-sm font-medium">{period.replace('_', ' ').replace('q', 'Q')}</span>
                    <span className="text-sm font-bold text-purple-800">{formatCurrency(amount as number)}</span>
                  </div>
                )) : <div className="text-sm text-muted-foreground">No equity data</div>
              }
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Risk Analysis</span>
          </CardTitle>
          <CardDescription>Identified financial risks and mitigation strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cashflow.riskAnalysis.riskFactors.map((risk, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{risk.factor}</h4>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">{formatCurrency(risk.impact)}</div>
                  <div className="text-xs text-muted-foreground">{(risk.probability * 100).toFixed(0)}% probability</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{risk.mitigation}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderLabourSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Labor Cost
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(labour.summary.laborGrandTotal))}
            </div>
            <p className="text-xs text-muted-foreground">All departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Base Wages
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(labour.summary.totalBaseWages))}
            </div>
            <p className="text-xs text-muted-foreground">Before overtime & fringes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overtime & Penalties
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(labour.summary.totalOvertimeAndPenalties))}
            </div>
            <p className="text-xs text-muted-foreground">Additional labor costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Fringes
            </CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(labour.summary.totalFringes))}
            </div>
            <p className="text-xs text-muted-foreground">Benefits & insurance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Cast Breakdown</span>
            </CardTitle>
            <CardDescription>Cast costs by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-blue-800">Above-the-Line Cast</h4>
                  <Badge variant="outline">{(labour.cast.aboveTheLine.principals as any).count + (labour.cast.aboveTheLine.supporting as any).count} people</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Principals ({(labour.cast.aboveTheLine.principals as any).count}):</span>
                    <span className="ml-1 font-medium">{formatCurrency((labour.cast.aboveTheLine.principals as any).baseWages)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Supporting ({(labour.cast.aboveTheLine.supporting as any).count}):</span>
                    <span className="ml-1 font-medium">{formatCurrency((labour.cast.aboveTheLine.supporting as any).baseWages)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-green-800">Below-the-Line Cast</h4>
                  <Badge variant="outline">{((labour.cast.belowTheLine.dayPlayers as any).count + (labour.cast.belowTheLine.stunts as any).performers)} people</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Day Players:</span>
                    <span className="ml-1 font-medium">{formatCurrency(parseFloat((labour.cast.belowTheLine.dayPlayers as any).estimatedTotalCost))}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stunts:</span>
                    <span className="ml-1 font-medium">{formatCurrency(parseFloat((labour.cast.belowTheLine.stunts as any).estimatedTotalCost))}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Extras ({(labour.cast.belowTheLine.extras as any).manDays} man-days):</span>
                  <span className="ml-1 font-medium">{formatCurrency(parseFloat((labour.cast.belowTheLine.extras as any).estimatedTotalCost))}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-800">{formatCurrency(parseFloat(labour.cast.castTotal as string))}</div>
              <div className="text-sm text-purple-600">Total Cast Cost (with fringes)</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-orange-600" />
              <span>Crew Breakdown</span>
            </CardTitle>
            <CardDescription>Crew costs by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(labour.crew.departments).map(([dept, data]) => (
                <div key={dept} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium capitalize">{dept.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-bold">{formatCurrency(parseFloat((data as any).departmentTotal))}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-800">{formatCurrency(parseFloat(labour.crew.crewTotal as string))}</div>
              <div className="text-sm text-orange-600">Total Crew Cost (with fringes)</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );


  const renderAggregatorSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency((aggregator.topSheet.grandTotal as any).totalDirectAndIndirect || (aggregator.topSheet.grandTotal as any).totalBudget || 0)}
            </div>
            <p className="text-xs text-muted-foreground">Gross budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Budget
            </CardTitle>
            <Calculator className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency((aggregator.topSheet.grandTotal as any).netCost || (aggregator.topSheet.grandTotal as any).netBudget || 0)}
            </div>
            <p className="text-xs text-muted-foreground">After tax incentive</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Above-the-Line
            </CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(aggregator.topSheet.totalAboveLine)}
            </div>
            <p className="text-xs text-muted-foreground">Talent & creative</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Below-the-Line
            </CardTitle>
            <Wrench className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(aggregator.topSheet.totalBelowLine)}
            </div>
            <p className="text-xs text-muted-foreground">Production costs</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-blue-600" />
            <span>Budget Top Sheet</span>
          </CardTitle>
          <CardDescription>Complete budget breakdown by major categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-purple-600">Above-the-Line</h4>
                {Object.entries(aggregator.topSheet.aboveTheLine).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <span className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^\d+/, '').trim()}</span>
                    <span className="text-sm font-bold text-purple-800">{formatCurrency(value as number)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-orange-600">Below-the-Line</h4>
                {Object.entries(aggregator.topSheet.belowTheLine).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <span className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^\d+/, '').trim()}</span>
                    <span className="text-sm font-bold text-orange-800">{formatCurrency(value as number)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-blue-600">Post-Production</h4>
                {Object.entries(aggregator.topSheet.postProduction).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^\d+/, '').trim()}</span>
                    <span className="text-sm font-bold text-blue-800">{formatCurrency(value as number)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-green-600">Other Costs</h4>
                {Object.entries(aggregator.topSheet.other).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^\d+/, '').trim()}</span>
                    <span className="text-sm font-bold text-green-800">{formatCurrency(value as number)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEquipmentSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Equipment
            </CardTitle>
            <Camera className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(typeof equipment.equipmentGrandTotal.total === 'number' ? equipment.equipmentGrandTotal.total : parseFloat(equipment.equipmentGrandTotal.total))}
            </div>
            <p className="text-xs text-muted-foreground">All departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Camera Equipment
            </CardTitle>
            <Film className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(typeof equipment.camera.cameraSubtotal === 'number' ? equipment.camera.cameraSubtotal : parseFloat(equipment.camera.cameraSubtotal))}
            </div>
            <p className="text-xs text-muted-foreground">Complete packages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Special Effects
            </CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(typeof equipment.specialEffects.specialEffectsSubtotal === 'number' ? equipment.specialEffects.specialEffectsSubtotal : parseFloat(equipment.specialEffects.specialEffectsSubtotal))}
            </div>
            <p className="text-xs text-muted-foreground">Mechanical & optical</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lighting
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(typeof equipment.lighting.lightingSubtotal === 'number' ? equipment.lighting.lightingSubtotal : parseFloat(equipment.lighting.lightingSubtotal))}
            </div>
            <p className="text-xs text-muted-foreground">Studio & location</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-blue-600" />
              <span>Camera Department</span>
            </CardTitle>
            <CardDescription>Complete camera equipment breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(equipment.camera).filter(([key]) => key !== 'cameraSubtotal').map(([key, data]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{(data as any).item || (data as any).lineItem || key}</h4>
                  <span className="text-lg font-bold text-blue-600">{formatCurrency(parseFloat(String((data as any).cost)))}</span>
                </div>
                <p className="text-sm text-muted-foreground">{(data as any).description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span>Special Effects</span>
            </CardTitle>
            <CardDescription>Mechanical and optical effects equipment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(equipment.specialEffects).filter(([key]) => key !== 'specialEffectsSubtotal').map(([key, data]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{(data as any).item || (data as any).lineItem || key}</h4>
                  <span className="text-lg font-bold text-orange-600">{formatCurrency(parseFloat(String((data as any).cost)))}</span>
                </div>
                <p className="text-sm text-muted-foreground">{(data as any).description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderInsuranceSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Insurance
            </CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(insurance.insuranceSummary.grandTotal)}
            </div>
            <p className="text-xs text-muted-foreground">All coverages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Bond
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(insurance.completionBond.fee)}
            </div>
            <p className="text-xs text-muted-foreground">Bonding fee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Equipment Coverage
            </CardTitle>
            <HardDrive className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(insurance.equipmentCoverage.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">Coverage value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Risk Level
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{insurance.riskAssessment.overallRisk}</div>
            <p className="text-xs text-muted-foreground">Assessment</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Insurance Coverage Breakdown</span>
          </CardTitle>
          <CardDescription>Comprehensive insurance coverage analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-600">General Liability</h4>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Per Occurrence:</span>
                    <span className="ml-1 font-medium">{formatCurrency(insurance.generalLiability.coverage.perOccurrence)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">General Aggregate:</span>
                    <span className="ml-1 font-medium">{formatCurrency(insurance.generalLiability.coverage.generalAggregate)}</span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="text-lg font-bold text-blue-800">{formatCurrency((insurance.generalLiability.premium as any).totalPremium || (insurance.generalLiability.premium as any).premium || 0)}</div>
                  <div className="text-xs text-blue-600">Total Premium</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-green-600">Cast Insurance</h4>
              <div className="space-y-2">
                {Object.entries(insurance.castInsurance.essentialElements).map(([name, data]) => (
                  <div key={name} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium">{name.replace(/_/g, ' ')}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-800">{formatCurrency((data as any).premium || 0)}</div>
                      <div className="text-xs text-muted-foreground">{formatCurrency((data as any).value || 0)} coverage</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Risk Assessment</span>
          </CardTitle>
          <CardDescription>Identified production risks and mitigation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insurance.riskAssessment.riskFactors.map((risk, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{(risk as any).factor || (risk as any).type}</h4>
                <Badge variant={getSeverityColor(risk.level)}>{risk.level}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{risk.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderLocationsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Location Cost
            </CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(String(locations.locationGrandTotal.total)))}
            </div>
            <p className="text-xs text-muted-foreground">All locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Location Fees
            </CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(String(locations.locationFees.locationFeesTotal)))}
            </div>
            <p className="text-xs text-muted-foreground">Permits & fees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Accommodation
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(String(locations.locationSupport.accommodation.accommodationTotal)))}
            </div>
            <p className="text-xs text-muted-foreground">Cast & crew housing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transportation
            </CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(parseFloat(String(locations.locationSupport.transportation.transportationTotal)))}
            </div>
            <p className="text-xs text-muted-foreground">Equipment & people</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-blue-600" />
            <span>Location Fees Breakdown</span>
          </CardTitle>
          <CardDescription>Detailed breakdown of all location-related costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-600">Practical Locations</h4>
              {locations.locationFees.practicalLocations.map((location, index) => (
                <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-medium">{location.name}</h5>
                      <p className="text-sm text-muted-foreground">{(location as any).locationId || (location as any).country || 'Location'}</p>
                    </div>
                    <span className="text-lg font-bold text-blue-800">{formatCurrency(parseFloat((location as any).totalFee || (location as any).cost || '0'))}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{(location as any).name || (location as any).description || 'Location details'}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-green-600">Studio Facilities</h4>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-medium">Studio Facilities</h5>
                    <p className="text-sm text-muted-foreground">{(locations.locationFees.studioFacilities as any).id || (locations.locationFees.studioFacilities as any).locationId || 'Studio ID'}</p>
                  </div>
                  <span className="text-lg font-bold text-green-800">{formatCurrency(parseFloat((locations.locationFees.studioFacilities as any).totalFee || (locations.locationFees.studioFacilities as any).cost || '0'))}</span>
                </div>
                <p className="text-sm text-muted-foreground">Studio facilities and stages</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5 text-orange-600" />
            <span>Special Requirements</span>
          </CardTitle>
          <CardDescription>Unique production requirements and custom construction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(locations.specialRequirements).filter(([key]) => key !== 'specialTotal').map(([key, data]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="text-lg font-bold text-orange-600">{formatCurrency(parseFloat((data as any).cost || (data as any).totalFee || '0'))}</span>
                </div>
                <p className="text-sm text-muted-foreground">{(data as any).description || (data as any).name || 'Special requirement'}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPostProductionSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Post Cost
            </CardTitle>
            <Film className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(postProduction.postGrandTotal.total)}
            </div>
            <p className="text-xs text-muted-foreground">Complete post-production</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visual Effects
            </CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(postProduction.visualEffects.vfxGrandTotal)}
            </div>
            <p className="text-xs text-muted-foreground">Revolutionary VFX</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sound Design
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(postProduction.sound.soundGrandTotal)}
            </div>
            <p className="text-xs text-muted-foreground">Complete audio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delivery
            </CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(postProduction.delivery.deliveryTotal)}
            </div>
            <p className="text-xs text-muted-foreground">Masters & prints</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>Visual Effects Breakdown</span>
          </CardTitle>
          <CardDescription>Revolutionary VFX work for groundbreaking sequences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(postProduction.visualEffects).filter(([key]) => key !== 'vfxGrandTotal').map(([key, data]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="text-lg font-bold text-purple-600">{formatCurrency((data as any).total || (data as any).cost || 0)}</span>
                </div>
                <div className="space-y-2">
                  {Object.entries(data as any).filter(([subKey]) => subKey !== 'total' && subKey !== 'cost').map(([subKey, subValue]) => (
                    <div key={subKey} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground capitalize">{subKey.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="font-medium">{typeof subValue === 'number' ? formatCurrency(subValue) : String(subValue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Production Timeline</span>
          </CardTitle>
          <CardDescription>Post-production phases and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {postProduction.timeline.phases.map((phase, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{phase.phase}</h4>
                  <Badge variant="outline">{phase.weeks} weeks</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>{phase.startDate}</span>
                  <ArrowRight className="h-3 w-3 mx-2" />
                  <span>{phase.endDate}</span>
                </div>
                <div className="space-y-1">
                  {phase.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );


  const renderTaxSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Incentive Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(taxIncentives.totalIncentiveValue.netIncentiveValue)}
            </div>
            <p className="text-xs text-muted-foreground">After all fees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              UK Incentives
            </CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(taxIncentives.ukIncentives.ukIncentiveSubtotal)}
            </div>
            <p className="text-xs text-muted-foreground">United Kingdom</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              California Credits
            </CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(taxIncentives.californiaIncentives.californiaIncentiveSubtotal)}
            </div>
            <p className="text-xs text-muted-foreground">California</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Effective Rate
            </CardTitle>
            <Percent className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {taxIncentives.effectiveIncentiveRate.netPercentageAfterFees.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Of total budget</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>UK Incentives</span>
            </CardTitle>
            <CardDescription>United Kingdom tax benefits and grants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(taxIncentives.ukIncentives).filter(([key]) => key !== 'ukIncentiveSubtotal').map(([key, data]) => (
              <div key={key} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-blue-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="text-lg font-bold text-blue-800">{formatCurrency((data as any).calculatedValue || (data as any).finalValue || 0)}</span>
                </div>
                <div className="text-xs text-blue-600 mb-1">{(data as any).type || 'Tax Incentive'}</div>
                <p className="text-xs text-blue-700">{(data as any).notes || (data as any).description || 'Tax incentive benefit'}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-purple-600" />
              <span>California Credits</span>
            </CardTitle>
            <CardDescription>California state tax credit benefits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(taxIncentives.californiaIncentives).filter(([key]) => key !== 'californiaIncentiveSubtotal').map(([key, data]) => (
              <div key={key} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-purple-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="text-lg font-bold text-purple-800">{formatCurrency((data as any).calculatedValue || (data as any).finalValue || 0)}</span>
                </div>
                <div className="text-xs text-purple-600 mb-1">{(data as any).type || 'Tax Credit'}</div>
                <div className="text-xs text-purple-700 mb-1">Rate: {(((data as any).rate || 0) * 100).toFixed(0)}%</div>
                <p className="text-xs text-purple-700">{(data as any).notes || (data as any).description || 'California tax credit benefit'}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-orange-600" />
              <span>Namibia Incentives</span>
            </CardTitle>
            <CardDescription>Location-based benefits and waivers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(taxIncentives.namibiaIncentives).filter(([key]) => key !== 'namibiaIncentiveSubtotal').map(([key, data]) => (
              <div key={key} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-orange-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="text-lg font-bold text-orange-800">{formatCurrency((data as any).calculatedValue || (data as any).totalValue || 0)}</span>
                </div>
                <div className="text-xs text-orange-600 mb-1">{(data as any).type || 'Location Incentive'}</div>
                <p className="text-xs text-orange-700">{(data as any).notes || (data as any).description || 'Location-based incentive benefit'}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-600" />
            <span>Cash Flow Timing</span>
          </CardTitle>
          <CardDescription>When incentive benefits will be realized</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(taxIncentives.cashFlowTiming).map(([year, data]) => (
              <div key={year} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{year.replace('_', ' ')}</h4>
                  <span className="text-lg font-bold text-green-600">{formatCurrency((data as any).inflow || (data as any).inflows || 0)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{(data as any).description || (data as any).source || 'Cash flow timing'}</p>
              </div>
            ))}
          </div>
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
                <DollarSign className="h-8 w-8 text-brand-primary" />
                <h1 className="text-2xl font-bold text-foreground">
                  Black Panther - Budget Analysis
                </h1>
              </div>
              <Badge variant="outline" className="ml-4">
                Comprehensive Financial Dashboard
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
                Export Budget
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
        <div className="grid grid-cols-4 gap-1 bg-muted/30 rounded-lg p-1 mb-8">
          <Button
            variant={activeSection === 'cashflow' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('cashflow')}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Cash Flow</span>
          </Button>
          <Button
            variant={activeSection === 'labour' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('labour')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Labour</span>
          </Button>
          <Button
            variant={activeSection === 'aggregator' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('aggregator')}
            className="flex items-center space-x-2"
          >
            <Calculator className="h-4 w-4" />
            <span>Aggregator</span>
          </Button>
          <Button
            variant={activeSection === 'equipment' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('equipment')}
            className="flex items-center space-x-2"
          >
            <Camera className="h-4 w-4" />
            <span>Equipment</span>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-1 bg-muted/30 rounded-lg p-1 mb-8">
          <Button
            variant={activeSection === 'insurance' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('insurance')}
            className="flex items-center space-x-2"
          >
            <Shield className="h-4 w-4" />
            <span>Insurance</span>
          </Button>
          <Button
            variant={activeSection === 'locations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('locations')}
            className="flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4" />
            <span>Locations</span>
          </Button>
          <Button
            variant={activeSection === 'postproduction' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('postproduction')}
            className="flex items-center space-x-2"
          >
            <Film className="h-4 w-4" />
            <span>Post</span>
          </Button>
          <Button
            variant={activeSection === 'tax' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('tax')}
            className="flex items-center space-x-2"
          >
            <Percent className="h-4 w-4" />
            <span>Tax</span>
          </Button>
        </div>

        {/* Section Content */}
        {activeSection === 'cashflow' && renderCashflowSection()}
        {activeSection === 'labour' && renderLabourSection()}
        {activeSection === 'aggregator' && renderAggregatorSection()}
        {activeSection === 'equipment' && renderEquipmentSection()}
        {activeSection === 'insurance' && renderInsuranceSection()}
        {activeSection === 'locations' && renderLocationsSection()}
        {activeSection === 'postproduction' && renderPostProductionSection()}
        {activeSection === 'tax' && renderTaxSection()}
      </div>
    </div>
  );
}