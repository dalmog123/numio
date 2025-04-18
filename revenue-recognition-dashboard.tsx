"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Calendar,
  BarChart2,
  Search,
  Filter,
  RefreshCw,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Info,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  AreaChart,
  Area,
} from "recharts"

// Simplified mock data
const mockData = {
  summary: {
    totalRevenue: 4250000,
    recognizedRevenue: 2850000,
    deferredRevenue: 1400000,
    contractsCount: 87,
    pendingReview: 12,
  },
  revenueByType: [
    { name: "Subscription", value: 1850000, color: "#2563eb" },
    { name: "Professional Services", value: 950000, color: "#8b5cf6" },
    { name: "License", value: 750000, color: "#06b6d4" },
    { name: "Support", value: 700000, color: "#10b981" },
  ],
  revenueTimeline: [
    { month: "Jan", recognized: 420000, deferred: 180000 },
    { month: "Feb", recognized: 450000, deferred: 220000 },
    { month: "Mar", recognized: 480000, deferred: 250000 },
    { month: "Apr", recognized: 500000, deferred: 230000 },
    { month: "May", recognized: 520000, deferred: 260000 },
    { month: "Jun", recognized: 480000, deferred: 260000 },
  ],
  pendingContracts: [
    {
      id: "CON001",
      customer: "Acme Corporation",
      type: "Subscription",
      amount: 185000,
      startDate: "2023-06-15",
      endDate: "2024-06-14",
      status: "pending_review",
      complexity: "high",
    },
    {
      id: "CON002",
      customer: "TechGlobal Inc",
      type: "Professional Services",
      amount: 120000,
      startDate: "2023-06-10",
      endDate: "2023-12-10",
      status: "pending_review",
      complexity: "medium",
    },
    {
      id: "CON003",
      customer: "Innovate Solutions",
      type: "License + Support",
      amount: 230000,
      startDate: "2023-07-01",
      endDate: "2024-06-30",
      status: "pending_approval",
      complexity: "high",
    },
  ],
  revenueCompliance: [
    { name: "ASC 606 Compliant", value: 85, color: "#10b981" },
    { name: "Needs Review", value: 15, color: "#f59e0b" },
  ],
  performanceObligations: [
    { name: "Identified", value: 92, color: "#2563eb" },
    { name: "Pending", value: 8, color: "#f59e0b" },
  ],
}

// Color constants
const COLORS = {
  primary: "#2563eb", // primary color
  secondary: "#8b5cf6", // purple
  accent: "#06b6d4", // accent color
  success: "#10b981", // green
  warning: "#f59e0b", // amber
  danger: "#ef4444", // red
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

// Status Badge component
const StatusBadge = ({ status }) => {
  const variants = {
    pending_review: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    pending_approval: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  }

  const labels = {
    pending_review: "Pending Review",
    pending_approval: "Pending Approval",
    approved: "Approved",
    rejected: "Rejected",
  }

  return (
    <Badge variant="outline" className={`${variants[status]} border-0`}>
      {labels[status]}
    </Badge>
  )
}

// Complexity Badge component
const ComplexityBadge = ({ complexity }) => {
  const variants = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  }

  return (
    <Badge variant="outline" className={`${variants[complexity]} border-0`}>
      {complexity.charAt(0).toUpperCase() + complexity.slice(1)} Complexity
    </Badge>
  )
}

// Contract Card component
const ContractCard = ({ contract }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{contract.customer}</CardTitle>
            <CardDescription className="text-xs">
              {contract.type} - {contract.id}
            </CardDescription>
          </div>
          <StatusBadge status={contract.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">Contract Value</div>
          <div className="text-sm font-medium">{formatCurrency(contract.amount)}</div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">Term</div>
          <div className="text-sm font-medium">
            {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Complexity</div>
          <ComplexityBadge complexity={contract.complexity} />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="text-xs w-full">
          Review Contract
        </Button>
      </CardFooter>
    </Card>
  )
}

// Main Revenue Recognition Dashboard component
export default function RevenueRecognitionDashboard({ embedded = false }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // If embedded, use a simplified version
  if (embedded) {
    return (
      <div className="bg-white dark:bg-secondary h-full overflow-hidden">
        {/* Simplified header for embedded mode */}
        <header className="bg-white dark:bg-secondary border-b border-border p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                <FileText className="h-4 w-4" />
              </div>
              <h1 className="text-lg font-bold text-secondary dark:text-white">Revenue Recognition</h1>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main content - simplified for embedded view */}
        <main className="p-2 overflow-auto" style={{ height: "calc(100% - 45px)" }}>
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
              {/* Summary Panel - Simplified */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1 p-2">
                    <CardTitle className="text-xs">Recognized Revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="text-xl font-bold">{formatCurrency(mockData.summary.recognizedRevenue)}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1 p-2">
                    <CardTitle className="text-xs">Deferred Revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="text-xl font-bold text-purple-500">
                      {formatCurrency(mockData.summary.deferredRevenue)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue by Type - Simplified */}
              <Card className="border-0 shadow-sm mb-2">
                <CardHeader className="pb-1 p-2">
                  <CardTitle className="text-xs">Revenue by Type</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <Pie
                          data={mockData.revenueByType}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {mockData.revenueByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Timeline - Simplified */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 p-2">
                  <CardTitle className="text-xs">Revenue Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockData.revenueTimeline} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 8 }} />
                        <Area
                          type="monotone"
                          dataKey="recognized"
                          name="Recognized"
                          stackId="1"
                          stroke={COLORS.primary}
                          fill={COLORS.primary}
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="deferred"
                          name="Deferred"
                          stackId="1"
                          stroke={COLORS.secondary}
                          fill={COLORS.secondary}
                          fillOpacity={0.6}
                        />
                      </AreaChart>
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
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Revenue Recognition</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search contracts, customers..." className="w-64 pl-8" />
            </div>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Last updated indicator */}
        <div className="max-w-7xl mx-auto mt-2 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      {/* Quick insights summary row */}
      <div className="sticky top-[73px] z-20 bg-white dark:bg-secondary border-b border-border py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 overflow-x-auto pb-2">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total Revenue</span>
                <span className="font-bold">{formatCurrency(mockData.summary.totalRevenue)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Recognized</span>
                <span className="font-bold text-green-500">{formatCurrency(mockData.summary.recognizedRevenue)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Deferred</span>
                <span className="font-bold text-purple-500">{formatCurrency(mockData.summary.deferredRevenue)}</span>
              </div>
            </div>
            <Button variant="default" size="sm" className="flex items-center gap-1 bg-purple-600 text-white">
              Explore All <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Sub-navigation tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Contracts</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Forecasting</span>
            </TabsTrigger>
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
                {/* Summary Panel */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Total Revenue
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{formatCurrency(mockData.summary.totalRevenue)}</div>
                      <div className="text-sm text-muted-foreground">
                        Across {mockData.summary.contractsCount} contracts
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Recognized Revenue
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-500">
                        {formatCurrency(mockData.summary.recognizedRevenue)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((mockData.summary.recognizedRevenue / mockData.summary.totalRevenue) * 100)}% of
                        total revenue
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Deferred Revenue
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-500">
                        {formatCurrency(mockData.summary.deferredRevenue)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((mockData.summary.deferredRevenue / mockData.summary.totalRevenue) * 100)}% of total
                        revenue
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Pending Review
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-500">{mockData.summary.pendingReview}</div>
                      <div className="text-sm text-muted-foreground">Contracts requiring attention</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main dashboard grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left column */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Revenue by Type */}
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Revenue by Type</CardTitle>
                        </div>
                        <CardDescription>Distribution of revenue across different contract types</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockData.revenueByType}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => formatCurrency(value)} />
                              <Legend />
                              <Bar dataKey="value" name="Revenue" radius={[4, 4, 0, 0]}>
                                {mockData.revenueByType.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Revenue Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue Timeline</CardTitle>
                        <CardDescription>Recognized vs. deferred revenue over the last 6 months</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={mockData.revenueTimeline}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip formatter={(value) => formatCurrency(value)} />
                              <Legend />
                              <Area
                                type="monotone"
                                dataKey="recognized"
                                name="Recognized Revenue"
                                stackId="1"
                                stroke={COLORS.primary}
                                fill={COLORS.primary}
                                fillOpacity={0.6}
                              />
                              <Area
                                type="monotone"
                                dataKey="deferred"
                                name="Deferred Revenue"
                                stackId="1"
                                stroke={COLORS.secondary}
                                fill={COLORS.secondary}
                                fillOpacity={0.6}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Compliance Status */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Compliance Status</CardTitle>
                        <CardDescription>ASC 606 compliance and performance obligation identification</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-4">ASC 606 Compliance</h4>
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                  <Pie
                                    data={mockData.revenueCompliance}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                  >
                                    {mockData.revenueCompliance.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value) => `${value}%`} />
                                </RechartsPieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-4">Performance Obligations</h4>
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                  <Pie
                                    data={mockData.performanceObligations}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                  >
                                    {mockData.performanceObligations.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value) => `${value}%`} />
                                </RechartsPieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right column */}
                  <div className="space-y-6">
                    {/* Pending Contracts */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Pending Contracts</CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0"
                          >
                            {mockData.summary.pendingReview} Pending
                          </Badge>
                        </div>
                        <CardDescription>Contracts requiring review or approval</CardDescription>
                      </CardHeader>
                      <CardContent className="max-h-[600px] overflow-auto pr-4">
                        {mockData.pendingContracts.map((contract) => (
                          <ContractCard key={contract.id} contract={contract} />
                        ))}
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View All Contracts
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common revenue recognition tasks</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Create New Contract
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Run Compliance Check
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Review Flagged Items
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Clock className="h-4 w-4 mr-2" />
                          Schedule Revenue Recognition
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Export Revenue Report
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Other tabs would go here but are simplified for this mockup */}
          <TabsContent value="contracts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Management</CardTitle>
                <CardDescription>Manage and review all contracts</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Contract management content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Dashboard</CardTitle>
                <CardDescription>ASC 606 & IFRS 15 compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Compliance dashboard content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecasting</CardTitle>
                <CardDescription>Predictive revenue recognition analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Revenue forecasting content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
