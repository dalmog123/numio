"use client"

import { useState, useEffect } from "react"
import {
  Building,
  BarChart2,
  Search,
  Filter,
  RefreshCw,
  Download,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  MapPin,
  DollarSign,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
    totalLeases: 124,
    activeLeases: 98,
    expiringLeases: 12,
    totalLiability: 8750000,
    totalAssets: 9200000,
  },
  leasesByType: [
    { name: "Office Space", value: 42, color: "#2563eb" },
    { name: "Retail", value: 28, color: "#8b5cf6" },
    { name: "Equipment", value: 35, color: "#06b6d4" },
    { name: "Vehicles", value: 19, color: "#10b981" },
  ],
  leasesByClassification: [
    { name: "Finance", value: 65, color: "#2563eb" },
    { name: "Operating", value: 35, color: "#10b981" },
  ],
  liabilityTimeline: [
    { month: "Jan", shortTerm: 120000, longTerm: 720000 },
    { month: "Feb", shortTerm: 125000, longTerm: 710000 },
    { month: "Mar", shortTerm: 130000, longTerm: 700000 },
    { month: "Apr", shortTerm: 135000, longTerm: 690000 },
    { month: "May", shortTerm: 140000, longTerm: 680000 },
    { month: "Jun", shortTerm: 145000, longTerm: 670000 },
  ],
  expiringLeases: [
    {
      id: "LS001",
      property: "Downtown Office Tower",
      type: "Office Space",
      location: "New York, NY",
      monthlyPayment: 28500,
      expiryDate: "2023-08-15",
      status: "expiring_soon",
      classification: "finance",
    },
    {
      id: "LS002",
      property: "Retail Store #42",
      type: "Retail",
      location: "Chicago, IL",
      monthlyPayment: 15200,
      expiryDate: "2023-09-01",
      status: "expiring_soon",
      classification: "operating",
    },
    {
      id: "LS003",
      property: "Server Equipment",
      type: "Equipment",
      location: "Data Center",
      monthlyPayment: 8500,
      expiryDate: "2023-07-30",
      status: "expiring_soon",
      classification: "finance",
    },
  ],
  complianceStatus: [
    { name: "IFRS 16 Compliant", value: 92, color: "#10b981" },
    { name: "ASC 842 Compliant", value: 95, color: "#2563eb" },
    { name: "Documentation Complete", value: 88, color: "#8b5cf6" },
  ],
  leasesByLocation: [
    { name: "North America", value: 65, color: "#2563eb" },
    { name: "Europe", value: 20, color: "#8b5cf6" },
    { name: "Asia Pacific", value: 10, color: "#06b6d4" },
    { name: "Other", value: 5, color: "#10b981" },
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
  emerald: "#10b981", // emerald-500
  teal: "#14b8a6", // teal-500
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
    active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    expiring_soon: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    expired: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    renewal_pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  }

  const labels = {
    active: "Active",
    expiring_soon: "Expiring Soon",
    expired: "Expired",
    renewal_pending: "Renewal Pending",
  }

  return (
    <Badge variant="outline" className={`${variants[status]} border-0`}>
      {labels[status]}
    </Badge>
  )
}

// Classification Badge component
const ClassificationBadge = ({ classification }) => {
  const variants = {
    finance: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    operating: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  }

  const labels = {
    finance: "Finance Lease",
    operating: "Operating Lease",
  }

  return (
    <Badge variant="outline" className={`${variants[classification]} border-0`}>
      {labels[classification]}
    </Badge>
  )
}

// Lease Card component
const LeaseCard = ({ lease }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{lease.property}</CardTitle>
            <CardDescription className="text-xs">
              {lease.type} - {lease.id}
            </CardDescription>
          </div>
          <StatusBadge status={lease.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {lease.location}
          </div>
          <ClassificationBadge classification={lease.classification} />
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">Monthly Payment</div>
          <div className="text-sm font-medium">{formatCurrency(lease.monthlyPayment)}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Expiry Date</div>
          <div className="text-sm font-medium">{new Date(lease.expiryDate).toLocaleDateString()}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="text-xs w-full">
          Manage Lease
        </Button>
      </CardFooter>
    </Card>
  )
}

// Main Leases Management Dashboard component
export default function LeasesManagementDashboard({ embedded = false }) {
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
              <div className="p-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white">
                <Building className="h-4 w-4" />
              </div>
              <h1 className="text-lg font-bold text-secondary dark:text-white">Leases Management</h1>
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
                    <CardTitle className="text-xs">Active Leases</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="text-xl font-bold">{mockData.summary.activeLeases}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1 p-2">
                    <CardTitle className="text-xs">Total Liability</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="text-xl font-bold text-emerald-500">
                      {formatCurrency(mockData.summary.totalLiability)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Leases by Type - Simplified */}
              <Card className="border-0 shadow-sm mb-2">
                <CardHeader className="pb-1 p-2">
                  <CardTitle className="text-xs">Leases by Type</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <Pie
                          data={mockData.leasesByType}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {mockData.leasesByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Liability Timeline - Simplified */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 p-2">
                  <CardTitle className="text-xs">Liability Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockData.liabilityTimeline} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 8 }} />
                        <Area
                          type="monotone"
                          dataKey="shortTerm"
                          name="Short Term"
                          stackId="1"
                          stroke={COLORS.emerald}
                          fill={COLORS.emerald}
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="longTerm"
                          name="Long Term"
                          stackId="1"
                          stroke={COLORS.teal}
                          fill={COLORS.teal}
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
            <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white">
              <Building className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Leases Management</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search leases, properties..." className="w-64 pl-8" />
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
                <span className="text-xs text-muted-foreground">Active Leases</span>
                <span className="font-bold">{mockData.summary.activeLeases}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total Liability</span>
                <span className="font-bold text-emerald-500">{formatCurrency(mockData.summary.totalLiability)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Expiring Soon</span>
                <span className="font-bold text-amber-500">{mockData.summary.expiringLeases}</span>
              </div>
            </div>
            <Button variant="default" size="sm" className="flex items-center gap-1 bg-emerald-500 text-white">
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
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Properties</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Financial</span>
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
                        Total Leases
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{mockData.summary.totalLeases}</div>
                      <div className="text-sm text-muted-foreground">
                        {mockData.summary.activeLeases} active, {mockData.summary.expiringLeases} expiring soon
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Total Lease Liability
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-500">
                        {formatCurrency(mockData.summary.totalLiability)}
                      </div>
                      <div className="text-sm text-muted-foreground">IFRS 16 & ASC 842 compliant</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Right-of-Use Assets
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-500">
                        {formatCurrency(mockData.summary.totalAssets)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total capitalized lease assets</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        Expiring Leases
                        <Info className="h-4 w-4 ml-1 text-primary/70" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-500">{mockData.summary.expiringLeases}</div>
                      <div className="text-sm text-muted-foreground">Expiring in next 90 days</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main dashboard grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left column */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Leases by Type */}
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Leases by Type</CardTitle>
                        </div>
                        <CardDescription>
                          Distribution of leases across different property and asset types
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockData.leasesByType} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" name="Number of Leases" radius={[4, 4, 0, 0]}>
                                {mockData.leasesByType.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Lease Liability Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Lease Liability Timeline</CardTitle>
                        <CardDescription>Short-term vs. long-term lease liabilities over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={mockData.liabilityTimeline}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip formatter={(value) => formatCurrency(value)} />
                              <Legend />
                              <Area
                                type="monotone"
                                dataKey="shortTerm"
                                name="Short-Term Liability"
                                stackId="1"
                                stroke={COLORS.emerald}
                                fill={COLORS.emerald}
                                fillOpacity={0.6}
                              />
                              <Area
                                type="monotone"
                                dataKey="longTerm"
                                name="Long-Term Liability"
                                stackId="1"
                                stroke={COLORS.teal}
                                fill={COLORS.teal}
                                fillOpacity={0.6}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Lease Classification and Location */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Lease Classification & Location</CardTitle>
                        <CardDescription>Analysis by classification and geographic distribution</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-4">Lease Classification</h4>
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                  <Pie
                                    data={mockData.leasesByClassification}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                  >
                                    {mockData.leasesByClassification.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value) => `${value}%`} />
                                </RechartsPieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-4">Geographic Distribution</h4>
                            <div className="h-[200px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                  <Pie
                                    data={mockData.leasesByLocation}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                  >
                                    {mockData.leasesByLocation.map((entry, index) => (
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
                    {/* Expiring Leases */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Expiring Leases</CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0"
                          >
                            {mockData.summary.expiringLeases} Expiring
                          </Badge>
                        </div>
                        <CardDescription>Leases expiring in the next 90 days</CardDescription>
                      </CardHeader>
                      <CardContent className="max-h-[400px] overflow-auto pr-4">
                        {mockData.expiringLeases.map((lease) => (
                          <LeaseCard key={lease.id} lease={lease} />
                        ))}
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View All Leases
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Compliance Status */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Compliance Status</CardTitle>
                        <CardDescription>IFRS 16 & ASC 842 compliance metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockData.complianceStatus.map((item) => (
                            <div key={item.name}>
                              <div className="flex justify-between items-center mb-1">
                                <div className="text-sm font-medium">{item.name}</div>
                                <div className="text-sm">{item.value}%</div>
                              </div>
                              <Progress value={item.value} className="h-2" indicatorClassName={`bg-[${item.color}]`} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common lease management tasks</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Building className="h-4 w-4 mr-2" />
                          Add New Lease
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Manage Lease Portfolio
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Run Compliance Check
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Review Expiring Leases
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Export Lease Report
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Other tabs would go here but are simplified for this mockup */}
          <TabsContent value="properties" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>Manage and review all leased properties</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Property management content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Dashboard</CardTitle>
                <CardDescription>IFRS 16 & ASC 842 compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Compliance dashboard content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Analysis</CardTitle>
                <CardDescription>Lease liability and asset financial analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Financial analysis content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
