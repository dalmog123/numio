"use client"

import { useState, useEffect } from "react"
import { BarChart3, Info, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // adjust path if needed
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Simplified mock data
const mockData = {
  summary: {
    totalFlags: 42,
    criticalIssues: 8,
    exposureAmount: 1250000,
  },
  riskByCategory: [
    { name: "VAT", value: 35, risk: "high" },
    { name: "Transfer Pricing", value: 28, risk: "high" },
    { name: "Withholding Tax", value: 22, risk: "medium" },
    { name: "Corporate Tax", value: 18, risk: "medium" },
    { name: "Customs", value: 15, risk: "low" },
  ],
  timelineData: [
    { month: "Jan", flags: 12, exposure: 320000 },
    { month: "Feb", flags: 8, exposure: 280000 },
    { month: "Mar", flags: 17, exposure: 390000 },
    { month: "Apr", flags: 15, exposure: 340000 },
    { month: "May", flags: 21, exposure: 450000 },
    { month: "Jun", flags: 19, exposure: 420000 },
  ],
}

const explanations = {
  totalFlags: {
    title: "Total Flags",
    description:
      "The total number of tax compliance issues identified by our AI-powered analysis engine across all data sources and tax types.",
    logic:
      "Our system scans transaction data, invoices, contracts, and regulatory updates to identify potential compliance issues based on pattern recognition and rule-based analysis.",
    impact:
      "Each flag represents a potential tax compliance issue that may require attention. Higher numbers indicate more areas requiring review.",
  },
  criticalIssues: {
    title: "Critical Issues",
    description:
      "High-priority tax compliance issues that require immediate attention due to their potential financial impact or regulatory significance.",
    logic:
      "Issues are classified as critical based on a combination of financial materiality, compliance deadline proximity, and potential penalties.",
    impact: "Critical issues have the highest potential for negative financial impact if not addressed promptly.",
  },
  riskCategoryDistribution: {
    title: "Risk Category Distribution",
    description: "Visualization of risk flags by tax category and severity.",
    logic:
      "Each tax category (VAT, Transfer Pricing, etc.) is analyzed separately using specialized rule sets and ML models trained on relevant regulations and case law.",
    impact:
      "This view helps identify which tax areas have the highest concentration of issues, allowing for targeted remediation efforts.",
  },
  riskFlagsTimeline: {
    title: "Risk Flags Timeline",
    description: "Trend of risk flags and exposure over time.",
    logic:
      "Historical tracking of identified issues and their financial impact, allowing for trend analysis and effectiveness measurement of compliance initiatives.",
    impact:
      "Upward trends may indicate increasing compliance risks, while downward trends suggest improvement in compliance processes.",
  },
}

// Color constants
const COLORS = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
  primary: "#2563eb",
  accent: "#06b6d4",
}

// Helper function to format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Info Button Component
const InfoButton = ({ explanation, children }) => (
  <Popover>
    <PopoverTrigger asChild>
      <div className="cursor-pointer group inline-flex items-center">
        {children}
        <Info className="h-4 w-4 ml-1 text-primary/70" />
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-80 p-4">
      <div className="space-y-2">
        <h4 className="font-medium text-lg">{explanation.title}</h4>
        <p className="text-sm text-muted-foreground">{explanation.description}</p>
        <Separator />
        <div>
          <h5 className="font-medium text-sm">Analysis Logic:</h5>
          <p className="text-xs text-muted-foreground">{explanation.logic}</p>
        </div>
        <div>
          <h5 className="font-medium text-sm">Business Impact:</h5>
          <p className="text-xs text-muted-foreground">{explanation.impact}</p>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);


// Main Tax Intelligence Dashboard component
export default function TaxIntelligenceDashboard({ embedded = false }) {
  const [loading, setLoading] = useState(true)

  // Simulate initial data loading with a simple animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // If embedded, use a simplified version
  if (embedded) {
    return (
      <div className="bg-white dark:bg-secondary h-full overflow-hidden rounded-lg border border-border">
        {/* Simplified header for embedded mode */}
        <header className="bg-white dark:bg-secondary border-b border-border p-2">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-gradient-to-r from-primary to-accent text-white">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h1 className="text-lg font-bold text-secondary dark:text-white">Tax Intelligence</h1>
          </div>
        </header>

        {/* Main content - simplified for embedded view */}
        <main className="p-2 overflow-hidden" style={{ height: "calc(100% - 45px)" }}>
          {loading ? (
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-1 p-2">
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="h-12 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {/* Smart Summary Panel - Simplified */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1 p-2">
                    <CardTitle className="text-xs flex items-center">
                      Total Flags
                      <InfoButton explanation={explanations.totalFlags} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="text-xl font-bold">{mockData.summary.totalFlags}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1 p-2">
                    <CardTitle className="text-xs flex items-center">
                      Critical Issues
                      <InfoButton explanation={explanations.criticalIssues} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="text-xl font-bold text-red-500">{mockData.summary.criticalIssues}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Risk Category Chart - Simplified */}
              <Card className="border-0 shadow-sm mb-2">
                <CardHeader className="pb-1 p-2">
                  <CardTitle className="text-xs flex items-center">
                    Risk Categories
                    <InfoButton explanation={explanations.riskCategoryDistribution} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData.riskByCategory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 8 }} />
                        <Bar dataKey="value" name="Risk Score">
                          {mockData.riskByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.risk]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Chart - Simplified */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 p-2">
                  <CardTitle className="text-xs flex items-center">
                    Risk Timeline
                    <InfoButton explanation={explanations.riskFlagsTimeline} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData.timelineData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 8 }} />
                        <Line type="monotone" dataKey="flags" name="Risk Flags" stroke={COLORS.primary} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-secondary">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-secondary border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Tax Intelligence</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search flags, regulations..." className="w-64 pl-8" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Sub-navigation tabs */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risk-flags">Risk Flags</TabsTrigger>
            <TabsTrigger value="exposure-trends">Exposure Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-5 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Smart Summary Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="transition-all duration-300 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Total Flags
                        <InfoButton content="Total number of tax compliance issues identified by the system across all categories." />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {mockData.summary.totalFlags}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="transition-all duration-300 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Critical Issues
                        <InfoButton content="High-priority issues that require immediate attention due to significant financial or compliance risk." />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-500 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                        {mockData.summary.criticalIssues}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="transition-all duration-300 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Total Exposure
                        <InfoButton content="Estimated financial impact of all identified tax compliance issues." />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                        {formatCurrency(mockData.summary.exposureAmount)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main dashboard grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Risk Category Distribution */}
                  <Card className="transition-all duration-300 hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        Risk Category Distribution
                        <InfoButton content="Distribution of risk flags by tax category and severity. Higher bars indicate more risk flags in that category." />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={mockData.riskByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Risk Score">
                              {mockData.riskByCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.risk]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Flags Timeline */}
                  <Card className="transition-all duration-300 hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        Risk Flags Timeline
                        <InfoButton content="Trend of risk flags and financial exposure over the last 6 months. Shows patterns in risk identification." />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mockData.timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="flags"
                              name="Risk Flags"
                              stroke={COLORS.primary}
                              activeDot={{ r: 8 }}
                            />
                            <Line type="monotone" dataKey="exposure" name="Exposure ($)" stroke={COLORS.accent} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Other tabs would go here but are simplified for this mockup */}
          <TabsContent value="risk-flags" className="mt-6">
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Risk Flags content will be displayed here</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="exposure-trends" className="mt-6">
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Exposure Trends content will be displayed here</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
