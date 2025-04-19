"use client"

import { useState, useEffect } from "react"
import { Building, Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // adjust path if needed
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
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Simplified mock data
const mockData = {
    summary: {
        totalLeases: 124,
        activeLeases: 98,
        expiringLeases: 12,
        totalLiability: 8750000,
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
}

// Color constants
const COLORS = {
    primary: "#2563eb",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    emerald: "#10b981",
    teal: "#14b8a6",
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
// Info Button Component
const InfoButton = ({ content }) => (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                <Info className="h-4 w-4 text-primary/70" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-xs">
            <p>{content}</p>
        </PopoverContent>
    </Popover>
);

// Main Leases Management Dashboard component
export default function LeasesManagementDashboard({ embedded = false }) {
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
                        <div className="p-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white">
                            <Building className="h-4 w-4" />
                        </div>
                        <h1 className="text-lg font-bold text-secondary dark:text-white">Leases Management</h1>
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
                            {/* Summary Panel - Simplified */}
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-1 p-2">
                                        <CardTitle className="text-xs flex items-center">
                                            Active Leases
                                            <InfoButton content="Number of currently active lease contracts." />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-2">
                                        <div className="text-xl font-bold">{mockData.summary.activeLeases}</div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-1 p-2">
                                        <CardTitle className="text-xs flex items-center">
                                            Total Liability
                                            <InfoButton content="Total lease liability under IFRS 16 and ASC 842." />
                                        </CardTitle>
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
                                    <CardTitle className="text-xs flex items-center">
                                        Leases by Type
                                        <InfoButton content="Distribution of leases across different property and asset types." />
                                    </CardTitle>
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
                                    <CardTitle className="text-xs flex items-center">
                                        Liability Timeline
                                        <InfoButton content="Short-term vs. long-term lease liabilities over time." />
                                    </CardTitle>
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
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto p-4 overflow-hidden">
                {/* Sub-navigation tabs */}
                <Tabs defaultValue="overview" className="mb-6">
                    <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-1">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="properties">Properties</TabsTrigger>
                        <TabsTrigger value="compliance">Compliance</TabsTrigger>
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base flex items-center">
                                                Total Leases
                                                <InfoButton content="Total number of lease contracts in the system, both active and inactive." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                {mockData.summary.totalLeases}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {mockData.summary.activeLeases} active, {mockData.summary.expiringLeases} expiring soon
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base flex items-center">
                                                Total Lease Liability
                                                <InfoButton content="Total lease liability under IFRS 16 and ASC 842 accounting standards." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold text-emerald-500 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                                                {formatCurrency(mockData.summary.totalLiability)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">IFRS 16 & ASC 842 compliant</div>
                                        </CardContent>
                                    </Card>

                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base flex items-center">
                                                Expiring Leases
                                                <InfoButton content="Leases expiring in the next 90 days that require attention." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold text-amber-500 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                                                {mockData.summary.expiringLeases}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Expiring in next 90 days</div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Main dashboard grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Leases by Type */}
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                Leases by Type
                                                <InfoButton content="Distribution of leases across different property and asset types. Shows your lease portfolio composition." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500">
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
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                Lease Liability Timeline
                                                <InfoButton content="Short-term vs. long-term lease liabilities over time. Shows your liability structure and future obligations." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
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
                                </div>
                            </>
                        )}
                    </TabsContent>

                    {/* Other tabs would go here but are simplified for this mockup */}
                    <TabsContent value="properties" className="mt-6">
                        <Card className="h-[400px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                                <p>Property management content will be displayed here</p>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="compliance" className="mt-6">
                        <Card className="h-[400px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                                <p>Compliance dashboard content will be displayed here</p>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
