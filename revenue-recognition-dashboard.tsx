"use client"

import { useState, useEffect } from "react"
import { FileText, Search, Info } from "lucide-react"
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
}

// Color constants
const COLORS = {
    primary: "#2563eb",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
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

// Main Revenue Recognition Dashboard component
export default function RevenueRecognitionDashboard({ embedded = false }) {
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
                        <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                            <FileText className="h-4 w-4" />
                        </div>
                        <h1 className="text-lg font-bold text-secondary dark:text-white">Revenue Recognition</h1>
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
                                            Recognized Revenue
                                            <InfoButton content="Revenue that has been earned and can be reported in financial statements." />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-2">
                                        <div className="text-xl font-bold">{formatCurrency(mockData.summary.recognizedRevenue)}</div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-sm">
                                    <CardHeader className="pb-1 p-2">
                                        <CardTitle className="text-xs flex items-center">
                                            Deferred Revenue
                                            <InfoButton content="Revenue that has been collected but not yet earned." />
                                        </CardTitle>
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
                                    <CardTitle className="text-xs flex items-center">
                                        Revenue by Type
                                        <InfoButton content="Distribution of revenue across different contract types." />
                                    </CardTitle>
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
                                    <CardTitle className="text-xs flex items-center">
                                        Revenue Timeline
                                        <InfoButton content="Recognized vs. deferred revenue over the last 6 months." />
                                    </CardTitle>
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
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto p-4">
                {/* Sub-navigation tabs */}
                <Tabs defaultValue="overview" className="mb-6">
                    <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-1">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="contracts">Contracts</TabsTrigger>
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
                                                Total Revenue
                                                <InfoButton content="Total contract value across all active contracts." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                {formatCurrency(mockData.summary.totalRevenue)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Across {mockData.summary.contractsCount} contracts
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base flex items-center">
                                                Recognized Revenue
                                                <InfoButton content="Revenue that has been earned and can be reported in financial statements under ASC 606 and IFRS 15." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold text-green-500 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                                                {formatCurrency(mockData.summary.recognizedRevenue)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {Math.round((mockData.summary.recognizedRevenue / mockData.summary.totalRevenue) * 100)}% of
                                                total revenue
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base flex items-center">
                                                Deferred Revenue
                                                <InfoButton content="Revenue that has been collected but not yet earned. Will be recognized in future periods." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold text-purple-500 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                                                {formatCurrency(mockData.summary.deferredRevenue)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {Math.round((mockData.summary.deferredRevenue / mockData.summary.totalRevenue) * 100)}% of total
                                                revenue
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Main dashboard grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Revenue by Type */}
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                Revenue by Type
                                                <InfoButton content="Distribution of revenue across different contract types. Shows the revenue mix of your business." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={mockData.revenueByType} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                Revenue Timeline
                                                <InfoButton content="Recognized vs. deferred revenue over the last 6 months. Shows revenue recognition patterns over time." />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
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
                                </div>
                            </>
                        )}
                    </TabsContent>

                    {/* Other tabs would go here but are simplified for this mockup */}
                    <TabsContent value="contracts" className="mt-6">
                        <Card className="h-[400px] flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                                <p>Contract management content will be displayed here</p>
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
