"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  ArrowDown,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Filter,
  Info,
  Maximize2,
  Minimize2,
  PieChart,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  TableIcon,
  TrendingUp,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ZAxis,
  PieChart as RechartsPieChart,
  Pie,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
} from "recharts"

// Base mock data for the dashboard
const baseMockData = {
  summary: {
    totalFlags: 42,
    criticalIssues: 8,
    highRiskFlags: 15,
    mediumRiskFlags: 19,
    lowRiskFlags: 8,
    exposureAmount: 1250000,
    flaggedTransactions: 87,
    totalTransactions: 1243,
  },
  riskByCategory: [
    { name: "VAT Deductions", value: 35, risk: "high" },
    { name: "Transfer Pricing", value: 28, risk: "high" },
    { name: "Withholding Tax", value: 22, risk: "medium" },
    { name: "Corporate Income Tax", value: 18, risk: "medium" },
    { name: "Customs & Duties", value: 15, risk: "low" },
    { name: "Employee Benefits", value: 12, risk: "low" },
  ],
  timelineData: [
    { month: "Jan", flags: 12, exposure: 320000 },
    { month: "Feb", flags: 8, exposure: 280000 },
    { month: "Mar", flags: 17, exposure: 390000 },
    { month: "Apr", flags: 15, exposure: 340000 },
    { month: "May", flags: 21, exposure: 450000 },
    { month: "Jun", flags: 19, exposure: 420000 },
  ],
  legalExposure: [
    {
      name: "Tax Laws",
      children: [
        { name: "VAT Law", size: 35, risk: "high" },
        { name: "Income Tax Ordinance", size: 25, risk: "medium" },
        { name: "International Tax Treaties", size: 15, risk: "low" },
      ],
    },
    {
      name: "Court Rulings",
      children: [
        { name: "Supreme Court", size: 20, risk: "high" },
        { name: "District Court", size: 15, risk: "medium" },
        { name: "Tax Tribunal", size: 10, risk: "low" },
      ],
    },
    {
      name: "Tax Authority Positions",
      children: [
        { name: "Official Positions", size: 30, risk: "high" },
        { name: "Circulars", size: 20, risk: "medium" },
        { name: "Rulings", size: 15, risk: "low" },
      ],
    },
  ],
  materialityMatrix: [
    { x: 35, y: 80, z: 15, name: "VAT Deduction Issues", risk: "high" },
    { x: 65, y: 85, z: 20, name: "Transfer Pricing Gap", risk: "high" },
    { x: 50, y: 60, z: 12, name: "Withholding Compliance", risk: "medium" },
    { x: 75, y: 40, z: 8, name: "Customs Classification", risk: "medium" },
    { x: 25, y: 30, z: 5, name: "Employee Benefits", risk: "low" },
    { x: 85, y: 20, z: 3, name: "Documentation Issues", risk: "low" },
  ],
  recentFlags: [
    {
      id: "RF001",
      title: "VAT Deduction on Holding Company Expenses",
      source: "VAT Law Section 41",
      confidence: 92,
      date: "2023-06-15",
      risk: "high",
      description:
        "Multiple holding company expenses are being fully deducted, contradicting Position 2016/01 which limits deductibility based on direct revenue generation.",
      impact: 185000,
    },
    {
      id: "RF002",
      title: "Transfer Pricing Documentation Gap",
      source: "Income Tax Regulations 2006",
      confidence: 87,
      date: "2023-06-10",
      risk: "high",
      description:
        "Intercompany transactions with subsidiary in Singapore lack comprehensive transfer pricing documentation required by recent regulatory updates.",
      impact: 230000,
    },
    {
      id: "RF003",
      title: "Withholding Tax on Technical Services",
      source: "Income Tax Ordinance Section 170",
      confidence: 76,
      date: "2023-06-05",
      risk: "medium",
      description:
        "Payments to foreign consultants for technical services may be subject to withholding tax at 25% rather than the applied 15% rate.",
      impact: 120000,
    },
    {
      id: "RF004",
      title: "Employee Benefit Taxation",
      source: "Income Tax Ruling 2022/08",
      confidence: 68,
      date: "2023-06-01",
      risk: "medium",
      description:
        "New employee wellness program benefits may be classified as taxable benefits according to recent tax authority guidance.",
      impact: 85000,
    },
    {
      id: "RF005",
      title: "Customs Classification Discrepancy",
      source: "Customs Tariff Code",
      confidence: 62,
      date: "2023-05-28",
      risk: "low",
      description:
        "Imported manufacturing equipment may be classified under a different tariff code with higher duty rates than currently applied.",
      impact: 45000,
    },
  ],
  insights: [
    {
      id: "INS001",
      title: "VAT Deduction Pattern Detected",
      description:
        "System has identified a pattern of potentially excessive VAT deductions on holding company expenses across multiple quarters.",
      recommendation:
        "Review holding company expense allocation methodology and compare to Tax Authority Position 2016/01.",
      actions: ["Generate Memo", "Notify CFO", "Export Case Summary"],
    },
    {
      id: "INS002",
      title: "Transfer Pricing Risk Increasing",
      description:
        "Quarter-over-quarter increase in transfer pricing documentation gaps, particularly with Asian subsidiaries.",
      recommendation:
        "Conduct urgent review of transfer pricing documentation for Singapore and Malaysia transactions.",
      actions: ["Generate Memo", "Notify CFO", "Export Case Summary"],
    },
    {
      id: "INS003",
      title: "Withholding Tax Compliance Opportunity",
      description:
        "Potential to apply reduced withholding tax rates under treaty provisions for technical service payments.",
      recommendation: "Review eligibility for treaty benefits and documentation requirements.",
      actions: ["Generate Memo", "Notify CFO", "Export Case Summary"],
    },
  ],
  // New data for additional visualizations
  supplierRiskDistribution: [
    { name: "High-Risk Suppliers", value: 12, risk: "high" },
    { name: "Medium-Risk Suppliers", value: 28, risk: "medium" },
    { name: "Low-Risk Suppliers", value: 60, risk: "low" },
  ],
  businessSectorRisks: [
    { name: "Technology", value: 35, risk: "high" },
    { name: "Financial Services", value: 28, risk: "high" },
    { name: "Manufacturing", value: 22, risk: "medium" },
    { name: "Retail", value: 18, risk: "medium" },
    { name: "Healthcare", value: 15, risk: "low" },
    { name: "Construction", value: 12, risk: "low" },
  ],
  riskMitigationScores: [
    { name: "Documentation", current: 65, target: 90 },
    { name: "Compliance Processes", current: 72, target: 95 },
    { name: "Staff Training", current: 58, target: 85 },
    { name: "System Controls", current: 80, target: 95 },
    { name: "Vendor Management", current: 45, target: 80 },
  ],
  exposureProbability: [
    { name: "VAT Deductions", probability: 75, impact: 85, mitigation: 60 },
    { name: "Transfer Pricing", probability: 65, impact: 90, mitigation: 55 },
    { name: "Withholding Tax", probability: 45, impact: 70, mitigation: 65 },
    { name: "Corporate Income Tax", probability: 35, impact: 80, mitigation: 75 },
    { name: "Customs & Duties", probability: 25, impact: 60, mitigation: 80 },
  ],
  predictiveAnalysis: [
    { month: "Jul", predicted: 22, lowerBound: 18, upperBound: 26 },
    { month: "Aug", predicted: 24, lowerBound: 19, upperBound: 29 },
    { month: "Sep", predicted: 27, lowerBound: 21, upperBound: 33 },
    { month: "Oct", predicted: 30, lowerBound: 23, upperBound: 37 },
    { month: "Nov", predicted: 34, lowerBound: 26, upperBound: 42 },
    { month: "Dec", predicted: 38, lowerBound: 29, upperBound: 47 },
  ],
  topRiskSuppliers: [
    { name: "Tech Solutions Ltd", risk: 85, transactions: 42, amount: 320000 },
    { name: "Global Services Inc", risk: 78, transactions: 36, amount: 280000 },
    { name: "Innovative Systems", risk: 72, transactions: 28, amount: 210000 },
    { name: "Strategic Consulting", risk: 68, transactions: 22, amount: 190000 },
    { name: "Digital Platforms Co", risk: 65, transactions: 18, amount: 150000 },
  ],
  // Additional data for service provider input tax deduction analysis
  serviceProviderVatAnalysis: [
    { name: "IT Services", deductible: 75, nonDeductible: 25, risk: "medium" },
    { name: "Consulting", deductible: 60, nonDeductible: 40, risk: "high" },
    { name: "Legal Services", deductible: 50, nonDeductible: 50, risk: "high" },
    { name: "Marketing", deductible: 80, nonDeductible: 20, risk: "low" },
    { name: "Maintenance", deductible: 90, nonDeductible: 10, risk: "low" },
    { name: "Professional Training", deductible: 70, nonDeductible: 30, risk: "medium" },
  ],
  // Risk reduction potential data
  riskReductionPotential: [
    { category: "VAT Deductions", current: 85, potential: 35, savings: 120000 },
    { category: "Transfer Pricing", current: 78, potential: 30, savings: 180000 },
    { category: "Withholding Tax", current: 65, potential: 25, savings: 90000 },
    { category: "Corporate Income Tax", current: 55, potential: 20, savings: 75000 },
    { category: "Customs & Duties", current: 45, potential: 15, savings: 40000 },
  ],
  // Monthly risk trend by category
  monthlyRiskTrend: [
    { month: "Jan", vat: 35, tp: 28, wht: 22, cit: 18, customs: 15 },
    { month: "Feb", vat: 32, tp: 30, wht: 20, cit: 19, customs: 14 },
    { month: "Mar", vat: 38, tp: 32, wht: 24, cit: 20, customs: 16 },
    { month: "Apr", vat: 36, tp: 29, wht: 25, cit: 18, customs: 17 },
    { month: "May", vat: 40, tp: 33, wht: 26, cit: 21, customs: 18 },
    { month: "Jun", vat: 42, tp: 35, wht: 24, cit: 22, customs: 16 },
  ],
}

// Explanations for metrics and visualizations
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
  riskDistribution: {
    title: "Risk Distribution",
    description: "Breakdown of identified tax compliance issues by risk level (high, medium, low).",
    logic:
      "Risk levels are determined by an algorithm that considers financial impact, probability of audit detection, and potential penalties.",
    impact: "This distribution helps prioritize resources toward addressing the most significant risks first.",
  },
  totalExposure: {
    title: "Total Exposure",
    description:
      "The estimated financial impact if all identified tax compliance issues were challenged by tax authorities.",
    logic:
      "Calculated by summing the potential financial impact of each identified issue, including potential taxes, interest, and penalties.",
    impact:
      "This figure represents the maximum potential financial risk and helps quantify the importance of addressing identified issues.",
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
  materialityMatrix: {
    title: "Materiality vs. Likelihood Matrix",
    description: "Visualization of risk items by financial impact and probability.",
    logic:
      "Each risk is plotted based on its financial materiality (Y-axis), likelihood of being challenged (X-axis), and overall impact (bubble size).",
    impact:
      "This visualization helps prioritize which issues to address first based on both their potential impact and probability.",
  },
  recentRiskFlags: {
    title: "Recent Risk Flags",
    description: "Latest identified tax compliance issues.",
    logic:
      "New issues are identified through continuous monitoring of transactions, regulatory updates, and AI-powered pattern recognition.",
    impact: "Addressing recent flags promptly can prevent them from becoming more significant issues over time.",
  },
  smartInsights: {
    title: "Smart Insights",
    description: "AI-generated recommendations based on detected patterns.",
    logic:
      "Our AI analyzes patterns across multiple data points to identify systemic issues and opportunities that might not be apparent from individual flags.",
    impact:
      "These insights help address root causes rather than just symptoms, leading to more effective compliance improvements.",
  },
  // New explanations for additional visualizations
  supplierRiskDistribution: {
    title: "Supplier Risk Distribution",
    description: "Breakdown of suppliers by risk level based on their transaction patterns and compliance history.",
    logic:
      "Suppliers are classified based on multiple factors including transaction volume, complexity, documentation quality, and historical compliance issues.",
    impact:
      "Focusing on high-risk suppliers can significantly reduce overall tax compliance risk with targeted vendor management strategies.",
  },
  businessSectorRisks: {
    title: "Business Sector Risk Analysis",
    description: "Risk distribution across different business sectors for input tax deduction issues.",
    logic:
      "Each business sector has unique tax treatment considerations and compliance requirements that affect input tax deduction eligibility.",
    impact:
      "Understanding sector-specific risks helps tailor compliance approaches and focus resources on the most challenging areas.",
  },
  riskMitigationScores: {
    title: "Risk Mitigation Effectiveness",
    description: "Current vs. target scores for different risk mitigation strategies.",
    logic:
      "Each mitigation area is scored based on current implementation quality, coverage, and effectiveness against identified risks.",
    impact:
      "Closing gaps between current and target scores can significantly reduce overall tax compliance risk exposure.",
  },
  exposureProbability: {
    title: "Exposure Probability Analysis",
    description: "Multi-dimensional analysis of risk probability, potential impact, and current mitigation levels.",
    logic:
      "The radar chart shows three key dimensions for each risk category: probability of challenge, financial impact if challenged, and current mitigation effectiveness.",
    impact:
      "Areas with high probability and impact but low mitigation represent the most urgent priorities for compliance improvement.",
  },
  predictiveAnalysis: {
    title: "Predictive Risk Forecast",
    description: "AI-powered prediction of future risk flags based on historical patterns and current trends.",
    logic:
      "Machine learning models analyze historical data, seasonal patterns, business growth, and regulatory changes to forecast expected risk levels.",
    impact:
      "Predictive insights allow proactive resource allocation and preventive measures before issues materialize.",
  },
  topRiskSuppliers: {
    title: "Top Risk Suppliers",
    description: "Suppliers with the highest risk scores based on transaction patterns and compliance issues.",
    logic:
      "Risk scores are calculated using a weighted algorithm that considers transaction volume, complexity, documentation quality, and historical compliance issues.",
    impact:
      "Focusing compliance efforts on these suppliers can efficiently reduce overall risk exposure with targeted interventions.",
  },
  serviceProviderVatAnalysis: {
    title: "Service Provider VAT Analysis",
    description: "Analysis of input tax deduction eligibility across different service provider categories.",
    logic:
      "Our system analyzes invoices and contracts to determine the deductibility of VAT based on service type, purpose, and applicable tax regulations.",
    impact:
      "Identifying non-deductible VAT helps prevent incorrect deductions that could lead to tax assessments and penalties during audits.",
  },
  riskReductionPotential: {
    title: "Risk Reduction Potential",
    description: "Analysis of potential risk reduction and financial savings through improved compliance measures.",
    logic:
      "For each risk category, we calculate the potential reduction in risk score and associated financial savings based on implementing recommended compliance improvements.",
    impact:
      "This analysis helps quantify the return on investment for compliance initiatives and prioritize efforts based on potential savings.",
  },
  monthlyRiskTrend: {
    title: "Monthly Risk Trend by Category",
    description: "Visualization of how risk scores in different tax categories have evolved over time.",
    logic:
      "Monthly risk scores are calculated for each tax category based on identified issues, their severity, and financial impact.",
    impact:
      "Tracking these trends helps identify emerging risk areas and evaluate the effectiveness of compliance initiatives over time.",
  },
}

// Color constants
const COLORS = {
  high: "#ef4444", // red-500
  medium: "#f59e0b", // amber-500
  low: "#10b981", // emerald-500
  neutral: "#6b7280", // gray-500
  primary: "#2563eb", // primary color from the site
  accent: "#06b6d4", // accent color from the site
  highlight: "#8b5cf6", // highlight color from the site
  prediction: "#facc15", // yellow-400
  vat: "#3b82f6", // blue-500
  tp: "#ec4899", // pink-500
  wht: "#8b5cf6", // purple-500
  cit: "#f97316", // orange-500
  customs: "#14b8a6", // teal-500
}

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Helper function to format percentage
const formatPercentage = (value: number) => {
  return `${value}%`
}

// Helper function to generate random variation for simulating real-time data
const addRandomVariation = (value: number, maxVariation = 0.1) => {
  const variation = (Math.random() * 2 - 1) * maxVariation * value
  return Math.max(0, Math.round(value + variation))
}

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-secondary p-3 border border-border rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Risk Badge component
const RiskBadge = ({ risk }: { risk: string }) => {
  const variants = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  }

  return (
    <Badge variant="outline" className={`${variants[risk as keyof typeof variants]} border-0`}>
      {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
    </Badge>
  )
}

// Flag Card component
const FlagCard = ({ flag, onClick }: { flag: any; onClick: () => void }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{flag.title}</CardTitle>
            <CardDescription className="text-xs">{flag.source}</CardDescription>
          </div>
          <RiskBadge risk={flag.risk} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">Confidence</div>
          <div className="text-sm font-medium">{flag.confidence}%</div>
        </div>
        <Progress value={flag.confidence} className="h-2" />
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between">
        <div>Impact: {formatCurrency(flag.impact)}</div>
        <div>Flagged: {new Date(flag.date).toLocaleDateString()}</div>
      </CardFooter>
    </Card>
  )
}

// Insight Card component
const InsightCard = ({ insight }: { insight: any }) => {
  return (
    <Card className="mb-4 border-l-4" style={{ borderLeftColor: COLORS.primary }}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <Sparkles className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <CardTitle className="text-base">{insight.title}</CardTitle>
            <CardDescription className="text-sm">{insight.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm">
          <span className="font-medium">Recommendation: </span>
          {insight.recommendation}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex flex-wrap gap-2">
        {insight.actions.map((action: string, index: number) => (
          <Button key={index} variant="outline" size="sm" className="text-xs">
            {action}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}

// Explanation Popover component - now with always visible info icon
const ExplanationPopover = ({ id, children }: { id: keyof typeof explanations; children: React.ReactNode }) => {
  const explanation = explanations[id]

  return (
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
  )
}

// Expandable Section component
const ExpandableSection = ({
  title,
  description,
  children,
  defaultExpanded = false,
  id,
}: {
  title: string
  description?: string
  children: React.ReactNode
  defaultExpanded?: boolean
  id?: string
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <Card className="mb-6" id={id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>{children}</CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

// Navigation Indicator component for scrolling
const NavigationIndicator = ({ sections }: { sections: { id: string; title: string }[] }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-secondary/90 rounded-full shadow-lg p-2 border border-border">
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            size="icon"
            className={`rounded-full h-10 w-10 ${
              activeSection === section.id ? "bg-primary text-white" : "text-muted-foreground"
            }`}
            onClick={() => scrollToSection(section.id)}
            title={section.title}
          >
            <div className="h-2 w-2 rounded-full bg-current" />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 text-primary animate-pulse"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
        >
          <ArrowDown className="h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  )
}

// Main Tax Intelligence Dashboard component
export default function TaxIntelligenceDashboard({ embedded = false }: { embedded?: boolean }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedFlag, setSelectedFlag] = useState<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState("chart")
  const [filterOpen, setFilterOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [expandedInsights, setExpandedInsights] = useState(false)

  // State for dynamic data
  const [mockData, setMockData] = useState(baseMockData)

  // Mock loading state
  const [loading, setLoading] = useState(true)

  // Refs for scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const supplierAnalysisRef = useRef<HTMLDivElement>(null)
  const riskMitigationRef = useRef<HTMLDivElement>(null)
  const predictiveAnalysisRef = useRef<HTMLDivElement>(null)
  const serviceProviderRef = useRef<HTMLDivElement>(null)
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Navigation sections
  const navigationSections = [
    { id: "overview-section", title: "Overview" },
    { id: "supplier-analysis-section", title: "Supplier Analysis" },
    { id: "service-provider-section", title: "Service Provider Analysis" },
    { id: "risk-mitigation-section", title: "Risk Mitigation" },
    { id: "predictive-analysis-section", title: "Predictive Analysis" },
  ]

  // Function to simulate real-time data updates
  const updateData = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      const newData = JSON.parse(JSON.stringify(mockData))

      // Update summary data with small random variations
      newData.summary.totalFlags = addRandomVariation(newData.summary.totalFlags, 0.05)
      newData.summary.criticalIssues = addRandomVariation(newData.summary.criticalIssues, 0.1)
      newData.summary.highRiskFlags = addRandomVariation(newData.summary.highRiskFlags, 0.08)
      newData.summary.mediumRiskFlags = addRandomVariation(newData.summary.mediumRiskFlags, 0.08)
      newData.summary.lowRiskFlags = addRandomVariation(newData.summary.lowRiskFlags, 0.08)
      newData.summary.exposureAmount = addRandomVariation(newData.summary.exposureAmount, 0.03)

      // Ensure the sum of risk flags equals total flags
      const totalRiskFlags =
        newData.summary.highRiskFlags + newData.summary.mediumRiskFlags + newData.summary.lowRiskFlags
      if (totalRiskFlags !== newData.summary.totalFlags) {
        const diff = newData.summary.totalFlags - totalRiskFlags
        newData.summary.mediumRiskFlags += diff
      }

      // Update risk by category with small variations
      newData.riskByCategory.forEach((category: any) => {
        category.value = addRandomVariation(category.value, 0.08)
      })

      // Update timeline data with small variations for the most recent month
      const lastMonthIndex = newData.timelineData.length - 1
      newData.timelineData[lastMonthIndex].flags = addRandomVariation(newData.timelineData[lastMonthIndex].flags, 0.1)
      newData.timelineData[lastMonthIndex].exposure = addRandomVariation(
        newData.timelineData[lastMonthIndex].exposure,
        0.05,
      )

      // Update materiality matrix with small variations
      newData.materialityMatrix.forEach((item: any) => {
        item.x = Math.min(100, Math.max(0, addRandomVariation(item.x, 0.05)))
        item.y = Math.min(100, Math.max(0, addRandomVariation(item.y, 0.05)))
        item.z = Math.max(1, addRandomVariation(item.z, 0.08))
      })

      // Update supplier risk distribution
      newData.supplierRiskDistribution.forEach((item: any) => {
        item.value = addRandomVariation(item.value, 0.05)
      })

      // Update business sector risks
      newData.businessSectorRisks.forEach((item: any) => {
        item.value = addRandomVariation(item.value, 0.08)
      })

      // Update risk mitigation scores
      newData.riskMitigationScores.forEach((item: any) => {
        item.current = Math.min(item.target, addRandomVariation(item.current, 0.05))
      })

      // Update exposure probability
      newData.exposureProbability.forEach((item: any) => {
        item.probability = Math.min(100, Math.max(0, addRandomVariation(item.probability, 0.05)))
        item.mitigation = Math.min(100, Math.max(0, addRandomVariation(item.mitigation, 0.08)))
      })

      // Update predictive analysis
      newData.predictiveAnalysis.forEach((item: any) => {
        item.predicted = addRandomVariation(item.predicted, 0.05)
        item.lowerBound = Math.min(item.predicted, addRandomVariation(item.lowerBound, 0.08))
        item.upperBound = Math.max(item.predicted, addRandomVariation(item.upperBound, 0.08))
      })

      // Update service provider VAT analysis
      newData.serviceProviderVatAnalysis.forEach((item: any) => {
        const total = 100
        item.deductible = addRandomVariation(item.deductible, 0.05)
        item.deductible = Math.min(total, Math.max(0, item.deductible))
        item.nonDeductible = total - item.deductible
      })

      // Update risk reduction potential
      newData.riskReductionPotential.forEach((item: any) => {
        item.current = addRandomVariation(item.current, 0.05)
        item.potential = Math.min(item.current, addRandomVariation(item.potential, 0.08))
        item.savings = addRandomVariation(item.savings, 0.05)
      })

      setMockData(newData)
      setLastUpdated(new Date())
      setIsAnalyzing(false)
    }, 1500)
  }

  // Initial data loading
  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setLoading(false)
      updateData() // Initial data update
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Set up periodic data updates
  useEffect(() => {
    if (!loading && !embedded) {
      // Update data every 30 seconds
      updateIntervalRef.current = setInterval(updateData, 30000)
    }

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current)
      }
    }
  }, [loading, embedded])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle flag click
  const handleFlagClick = (flag: any) => {
    setSelectedFlag(flag)
  }

  // Handle flag dialog close
  const handleFlagDialogClose = () => {
    setSelectedFlag(null)
  }

  // Handle manual refresh
  const handleRefresh = () => {
    updateData()
  }

  // Handle scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  // If embedded, use a simplified version
  if (embedded) {
    return (
      <div className="bg-white dark:bg-secondary h-full overflow-hidden">
        {/* Simplified header for embedded mode */}
        <header className="bg-white dark:bg-secondary border-b border-border p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-gradient-to-r from-primary to-accent text-white">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h1 className="text-lg font-bold text-secondary dark:text-white">Tax Intelligence</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleRefresh} className="h-8 w-8 p-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
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
              {/* Smart Summary Panel - Simplified */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1 p-2">
                    <CardTitle className="text-xs">
                      <ExplanationPopover id="totalFlags">Total Flags</ExplanationPopover>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="text-xl font-bold">{mockData.summary.totalFlags}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1 p-2">
                    <CardTitle className="text-xs">
                      <ExplanationPopover id="criticalIssues">Critical Issues</ExplanationPopover>
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
                  <CardTitle className="text-xs">
                    <ExplanationPopover id="riskCategoryDistribution">Risk Categories</ExplanationPopover>
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
                            <Cell key={`cell-${index}`} fill={COLORS[entry.risk as keyof typeof COLORS]} />
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
                  <CardTitle className="text-xs">
                    <ExplanationPopover id="riskFlagsTimeline">Risk Timeline</ExplanationPopover>
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
    // Original full dashboard code with added dynamic features
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

            <Button variant="outline" size="icon" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isAnalyzing}
              className={isAnalyzing ? "animate-spin" : ""}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Export as PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TableIcon className="mr-2 h-4 w-4" />
                  <span>Export as Excel</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share Dashboard</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Last updated indicator */}
        <div className="max-w-7xl mx-auto mt-2 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            {isAnalyzing && (
              <span className="ml-2 flex items-center text-primary">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Analyzing data...
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Quick insights summary row */}
      <div className="sticky top-[73px] z-20 bg-white dark:bg-secondary border-b border-border py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total Flags</span>
                <span className="font-bold">{mockData.summary.totalFlags}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Critical Issues</span>
                <span className="font-bold text-red-500">{mockData.summary.criticalIssues}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total Exposure</span>
                <span className="font-bold">{formatCurrency(mockData.summary.exposureAmount)}</span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs text-muted-foreground">High Risk Suppliers</span>
                <span className="font-bold">{mockData.supplierRiskDistribution[0].value}</span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs text-muted-foreground">Risk Reduction Potential</span>
                <span className="font-bold text-emerald-500">
                  {formatCurrency(mockData.riskReductionPotential.reduce((sum, item) => sum + item.savings, 0))}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection(overviewRef)}
                className="text-primary hidden md:flex"
              >
                Overview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection(supplierAnalysisRef)}
                className="text-primary hidden md:flex"
              >
                Supplier Analysis
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection(serviceProviderRef)}
                className="text-primary hidden md:flex"
              >
                Service Providers
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => scrollToSection(predictiveAnalysisRef)}
                className="flex items-center gap-1 bg-primary text-white"
              >
                Explore All <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed navigation indicator */}
      <NavigationIndicator sections={navigationSections} />

      {/* Fixed scroll down button - always visible */}
      <div className="fixed bottom-6 right-6 z-20">
        <Button
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
          className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Filter panel - conditionally rendered */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary/5 dark:bg-secondary/80 border-b border-border overflow-hidden z-10"
          >
            <div className="max-w-7xl mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filter Dashboard</h3>
                <Button variant="ghost" size="icon" onClick={() => setFilterOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <Select defaultValue="last6months">
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="last3months">Last 3 Months</SelectItem>
                      <SelectItem value="last6months">Last 6 Months</SelectItem>
                      <SelectItem value="lastyear">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Tax Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="cit">Corporate Income Tax</SelectItem>
                      <SelectItem value="tp">Transfer Pricing</SelectItem>
                      <SelectItem value="wht">Withholding Tax</SelectItem>
                      <SelectItem value="customs">Customs & Duties</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Risk Level</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Legal Source</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="laws">Tax Laws</SelectItem>
                      <SelectItem value="rulings">Court Rulings</SelectItem>
                      <SelectItem value="positions">Tax Authority Positions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Reset Filters</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Sub-navigation tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="risk-flags" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk Flags</span>
            </TabsTrigger>
            <TabsTrigger value="exposure-trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Exposure Trends</span>
            </TabsTrigger>
            <TabsTrigger value="legal-actions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Legal Actions</span>
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
                {/* Overview Section */}
                <div id="overview-section" ref={overviewRef}>
                  {/* Smart Summary Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          <ExplanationPopover id="totalFlags">Total Flags</ExplanationPopover>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          key={mockData.summary.totalFlags}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-3xl font-bold"
                        >
                          {mockData.summary.totalFlags}
                        </motion.div>
                        <div className="text-sm text-muted-foreground">
                          {formatPercentage(
                            (mockData.summary.flaggedTransactions / mockData.summary.totalTransactions) * 100,
                          )}{" "}
                          of transactions
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          <ExplanationPopover id="criticalIssues">Critical Issues</ExplanationPopover>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          key={mockData.summary.criticalIssues}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-3xl font-bold text-red-500"
                        >
                          {mockData.summary.criticalIssues}
                        </motion.div>
                        <div className="text-sm text-muted-foreground">Require immediate attention</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          <ExplanationPopover id="riskDistribution">Risk Distribution</ExplanationPopover>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>High</span>
                              <motion.span
                                key={mockData.summary.highRiskFlags}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-medium"
                              >
                                {mockData.summary.highRiskFlags}
                              </motion.span>
                            </div>
                            <motion.div
                              key={`high-${mockData.summary.highRiskFlags}`}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.5 }}
                            >
                              <Progress
                                value={(mockData.summary.highRiskFlags / mockData.summary.totalFlags) * 100}
                                className="h-2 bg-red-100 dark:bg-red-900/30"
                                indicatorClassName="bg-red-500"
                              />
                            </motion.div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Med</span>
                              <motion.span
                                key={mockData.summary.mediumRiskFlags}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-medium"
                              >
                                {mockData.summary.mediumRiskFlags}
                              </motion.span>
                            </div>
                            <motion.div
                              key={`med-${mockData.summary.mediumRiskFlags}`}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.5 }}
                            >
                              <Progress
                                value={(mockData.summary.mediumRiskFlags / mockData.summary.totalFlags) * 100}
                                className="h-2 bg-amber-100 dark:bg-amber-900/30"
                                indicatorClassName="bg-amber-500"
                              />
                            </motion.div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Low</span>
                              <motion.span
                                key={mockData.summary.lowRiskFlags}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-medium"
                              >
                                {mockData.summary.lowRiskFlags}
                              </motion.span>
                            </div>
                            <motion.div
                              key={`low-${mockData.summary.lowRiskFlags}`}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.5 }}
                            >
                              <Progress
                                value={(mockData.summary.lowRiskFlags / mockData.summary.totalFlags) * 100}
                                className="h-2 bg-emerald-100 dark:bg-emerald-900/30"
                                indicatorClassName="bg-emerald-500"
                              />
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          <ExplanationPopover id="totalExposure">Total Exposure</ExplanationPopover>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          key={mockData.summary.exposureAmount}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-3xl font-bold"
                        >
                          {formatCurrency(mockData.summary.exposureAmount)}
                        </motion.div>
                        <div className="text-sm text-muted-foreground">Potential financial impact</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main dashboard grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Dynamic Flag Heatmap */}
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>
                              <ExplanationPopover id="riskCategoryDistribution">
                                Risk Category Distribution
                              </ExplanationPopover>
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={viewMode === "chart" ? "bg-muted" : ""}
                                onClick={() => setViewMode("chart")}
                              >
                                <PieChart className="h-4 w-4 mr-1" />
                                Chart
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={viewMode === "table" ? "bg-muted" : ""}
                                onClick={() => setViewMode("table")}
                              >
                                <TableIcon className="h-4 w-4 mr-1" />
                                Table
                              </Button>
                            </div>
                          </div>
                          <CardDescription>Distribution of risk flags by tax category and severity</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {viewMode === "chart" ? (
                            <div className="h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={mockData.riskByCategory}
                                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <RechartsTooltip content={<CustomTooltip />} />
                                  <Legend />
                                  <Bar dataKey="value" name="Risk Score">
                                    {mockData.riskByCategory.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[entry.risk as keyof typeof COLORS]} />
                                    ))}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          ) : (
                            <div className="border rounded-md">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left p-2">Category</th>
                                    <th className="text-left p-2">Risk Score</th>
                                    <th className="text-left p-2">Severity</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {mockData.riskByCategory.map((item, index) => (
                                    <tr key={index} className="border-b">
                                      <td className="p-2">{item.name}</td>
                                      <td className="p-2">{item.value}</td>
                                      <td className="p-2">
                                        <RiskBadge risk={item.risk} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Red Flag Timeline */}
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <ExplanationPopover id="riskFlagsTimeline">Risk Flags Timeline</ExplanationPopover>
                          </CardTitle>
                          <CardDescription>Trend of risk flags and exposure over the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={mockData.timelineData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                  yAxisId="left"
                                  type="monotone"
                                  dataKey="flags"
                                  name="Risk Flags"
                                  stroke={COLORS.primary}
                                  activeDot={{ r: 8 }}
                                />
                                <Line
                                  yAxisId="right"
                                  type="monotone"
                                  dataKey="exposure"
                                  name="Exposure ($)"
                                  stroke={COLORS.highlight}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Monthly Risk Trend by Category */}
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <ExplanationPopover id="monthlyRiskTrend">
                              Monthly Risk Trend by Category
                            </ExplanationPopover>
                          </CardTitle>
                          <CardDescription>
                            Visualization of how risk scores in different tax categories have evolved over time
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={mockData.monthlyRiskTrend}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="vat"
                                  name="VAT"
                                  stroke={COLORS.vat}
                                  activeDot={{ r: 8 }}
                                />
                                <Line type="monotone" dataKey="tp" name="Transfer Pricing" stroke={COLORS.tp} />
                                <Line type="monotone" dataKey="wht" name="Withholding Tax" stroke={COLORS.wht} />
                                <Line type="monotone" dataKey="cit" name="Corporate Income Tax" stroke={COLORS.cit} />
                                <Line
                                  type="monotone"
                                  dataKey="customs"
                                  name="Customs & Duties"
                                  stroke={COLORS.customs}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="mt-4 text-sm text-muted-foreground">
                            <p>
                              <span className="font-medium">Analysis:</span> VAT and Transfer Pricing risks show the
                              strongest upward trend over the past 6 months, with VAT risk scores increasing by 20%
                              since January.
                            </p>
                            <p className="mt-2">
                              <span className="font-medium">Recommendation:</span> Prioritize VAT compliance reviews and
                              transfer pricing documentation updates to address the increasing risk trends in these
                              areas.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Materiality vs Likelihood Matrix */}
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <ExplanationPopover id="materialityMatrix">
                              Materiality vs. Likelihood Matrix
                            </ExplanationPopover>
                          </CardTitle>
                          <CardDescription>
                            Visualization of risk items by financial impact and probability
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  type="number"
                                  dataKey="x"
                                  name="Likelihood"
                                  domain={[0, 100]}
                                  label={{ value: "Likelihood (%)", position: "bottom", offset: 0 }}
                                />
                                <YAxis
                                  type="number"
                                  dataKey="y"
                                  name="Materiality"
                                  domain={[0, 100]}
                                  label={{ value: "Materiality (%)", angle: -90, position: "left" }}
                                />
                                <ZAxis type="number" dataKey="z" range={[50, 400]} name="Impact" />
                                <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} />
                                <Scatter name="Risk Items" data={mockData.materialityMatrix}>
                                  {mockData.materialityMatrix.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.risk as keyof typeof COLORS]} />
                                  ))}
                                </Scatter>
                              </ScatterChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="flex justify-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.high }}></div>
                              <span className="text-xs">High Risk</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.medium }}></div>
                              <span className="text-xs">Medium Risk</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.low }}></div>
                              <span className="text-xs">Low Risk</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                      {/* Recent Flags */}
                      <Card className="h-[calc(50%-12px)]">
                        <CardHeader>
                          <CardTitle>
                            <ExplanationPopover id="recentRiskFlags">Recent Risk Flags</ExplanationPopover>
                          </CardTitle>
                          <CardDescription>Latest identified tax compliance issues</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[400px] pr-4">
                            {mockData.recentFlags.map((flag) => (
                              <FlagCard key={flag.id} flag={flag} onClick={() => handleFlagClick(flag)} />
                            ))}
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      {/* Smart Insights */}
                      <Card className="h-[calc(50%-12px)]">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary" />
                            <CardTitle>
                              <ExplanationPopover id="smartInsights">Smart Insights</ExplanationPopover>
                            </CardTitle>
                          </div>
                          <CardDescription>AI-generated recommendations based on detected patterns</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[400px] pr-4">
                            {mockData.insights.map((insight) => (
                              <InsightCard key={insight.id} insight={insight} />
                            ))}
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Supplier Analysis Section */}
                <div
                  id="supplier-analysis-section"
                  ref={supplierAnalysisRef}
                  className="mt-12 pt-6 border-t border-border"
                >
                  <h2 className="text-2xl font-bold mb-6">Supplier Risk Analysis</h2>
                  <ExpandableSection
                    title="Supplier Risk Distribution"
                    description="Analysis of suppliers by risk level and transaction patterns"
                    defaultExpanded={true}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          <ExplanationPopover id="supplierRiskDistribution">
                            Supplier Risk Distribution
                          </ExplanationPopover>
                        </h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                              <Pie
                                data={mockData.supplierRiskDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                labelLine={true}
                              >
                                {mockData.supplierRiskDistribution.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[entry.risk as keyof typeof COLORS]} />
                                ))}
                              </Pie>
                              <Legend />
                              <RechartsTooltip />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Analysis:</span> 12% of suppliers (high-risk) account for 45%
                            of total tax compliance risk exposure. These suppliers typically have complex transaction
                            patterns, incomplete documentation, or operate in high-risk jurisdictions.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          <ExplanationPopover id="businessSectorRisks">
                            Business Sector Risk Analysis
                          </ExplanationPopover>
                        </h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockData.businessSectorRisks}
                              layout="vertical"
                              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis dataKey="name" type="category" width={100} />
                              <RechartsTooltip />
                              <Bar dataKey="value" name="Risk Score">
                                {mockData.businessSectorRisks.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[entry.risk as keyof typeof COLORS]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Analysis:</span> Technology and Financial Services sectors
                            show the highest risk scores due to complex service structures and cross-border transactions
                            that create VAT and transfer pricing challenges.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">
                        <ExplanationPopover id="topRiskSuppliers">Top Risk Suppliers</ExplanationPopover>
                      </h4>
                      <div className="border rounded-md">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Supplier</th>
                              <th className="text-left p-2">Risk Score</th>
                              <th className="text-left p-2">Transactions</th>
                              <th className="text-left p-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockData.topRiskSuppliers.map((supplier, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2">{supplier.name}</td>
                                <td className="p-2">
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={supplier.risk}
                                      className="h-2 w-16"
                                      indicatorClassName={
                                        supplier.risk > 75
                                          ? "bg-red-500"
                                          : supplier.risk > 60
                                            ? "bg-amber-500"
                                            : "bg-emerald-500"
                                      }
                                    />
                                    <span>{supplier.risk}</span>
                                  </div>
                                </td>
                                <td className="p-2">{supplier.transactions}</td>
                                <td className="p-2">{formatCurrency(supplier.amount)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>

                {/* Service Provider Analysis Section */}
                <div
                  id="service-provider-section"
                  ref={serviceProviderRef}
                  className="mt-12 pt-6 border-t border-border"
                >
                  <h2 className="text-2xl font-bold mb-6">Service Provider VAT Analysis</h2>
                  <ExpandableSection
                    title="Input Tax Deduction Analysis"
                    description="Analysis of VAT deductibility for different service provider categories"
                    defaultExpanded={true}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          <ExplanationPopover id="serviceProviderVatAnalysis">
                            Service Provider VAT Deductibility
                          </ExplanationPopover>
                        </h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockData.serviceProviderVatAnalysis}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <RechartsTooltip />
                              <Legend />
                              <Bar dataKey="deductible" name="Deductible VAT %" stackId="a" fill={COLORS.low} />
                              <Bar dataKey="nonDeductible" name="Non-Deductible VAT %" stackId="a" fill={COLORS.high} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Analysis:</span> Legal and consulting services have the
                            highest proportion of non-deductible VAT due to their mixed-use nature and connection to
                            exempt activities. Maintenance services show the highest deductibility rates.
                          </p>
                          <p className="mt-2">
                            <span className="font-medium">Recommendation:</span> Review allocation methodologies for
                            legal and consulting services to ensure proper VAT treatment and maximize legitimate
                            deductions.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          <ExplanationPopover id="riskReductionPotential">Risk Reduction Potential</ExplanationPopover>
                        </h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockData.riskReductionPotential}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="category" />
                              <YAxis yAxisId="left" orientation="left" />
                              <YAxis yAxisId="right" orientation="right" domain={[0, 200000]} />
                              <RechartsTooltip />
                              <Legend />
                              <Bar
                                yAxisId="left"
                                dataKey="current"
                                name="Current Risk Score"
                                fill={COLORS.high}
                                radius={[4, 4, 0, 0]}
                              />
                              <Bar
                                yAxisId="left"
                                dataKey="potential"
                                name="Potential Risk Reduction"
                                fill={COLORS.low}
                                radius={[4, 4, 0, 0]}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="savings"
                                name="Potential Savings ($)"
                                stroke={COLORS.primary}
                                strokeWidth={2}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Analysis:</span> VAT Deductions and Transfer Pricing areas
                            show the highest potential for risk reduction and financial savings through improved
                            compliance measures.
                          </p>
                          <p className="mt-2">
                            <span className="font-medium">Recommendation:</span> Prioritize compliance initiatives in
                            these areas to maximize return on investment in risk reduction efforts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>

                {/* Risk Mitigation Section */}
                <div id="risk-mitigation-section" ref={riskMitigationRef} className="mt-12 pt-6 border-t border-border">
                  <h2 className="text-2xl font-bold mb-6">Risk Mitigation Analysis</h2>
                  <ExpandableSection
                    title="Risk Mitigation Effectiveness"
                    description="Analysis of current risk mitigation strategies and improvement opportunities"
                    defaultExpanded={true}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          <ExplanationPopover id="riskMitigationScores">
                            Risk Mitigation Effectiveness
                          </ExplanationPopover>
                        </h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockData.riskMitigationScores}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <RechartsTooltip />
                              <Legend />
                              <Bar dataKey="current" name="Current Score" fill={COLORS.primary} />
                              <Bar dataKey="target" name="Target Score" fill={COLORS.accent} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Analysis:</span> The largest gaps between current and target
                            mitigation scores are in Vendor Management (35 points) and Staff Training (27 points).
                          </p>
                          <p className="mt-2">
                            <span className="font-medium">Recommendation:</span> Prioritize improvements in vendor
                            management processes and staff training programs to reduce overall risk exposure.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          <ExplanationPopover id="exposureProbability">
                            Exposure Probability Analysis
                          </ExplanationPopover>
                        </h4>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={90} data={mockData.exposureProbability}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="name" />
                              <PolarRadiusAxis domain={[0, 100]} />
                              <Radar
                                name="Probability"
                                dataKey="probability"
                                stroke={COLORS.high}
                                fill={COLORS.high}
                                fillOpacity={0.5}
                              />
                              <Radar
                                name="Impact"
                                dataKey="impact"
                                stroke={COLORS.primary}
                                fill={COLORS.primary}
                                fillOpacity={0.5}
                              />
                              <Radar
                                name="Mitigation"
                                dataKey="mitigation"
                                stroke={COLORS.low}
                                fill={COLORS.low}
                                fillOpacity={0.5}
                              />
                              <Legend />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Analysis:</span> VAT Deductions and Transfer Pricing show high
                            probability and impact scores but relatively low mitigation scores, indicating significant
                            risk exposure.
                          </p>
                          <p className="mt-2">
                            <span className="font-medium">Recommendation:</span> Focus on strengthening mitigation
                            measures for these high-risk areas to reduce the gap between risk and mitigation levels.
                          </p>
                        </div>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>

                {/* Predictive Analysis Section */}
                <div
                  id="predictive-analysis-section"
                  ref={predictiveAnalysisRef}
                  className="mt-12 pt-6 border-t border-border"
                >
                  <h2 className="text-2xl font-bold mb-6">Predictive Risk Analysis</h2>
                  <ExpandableSection
                    title="Predictive Risk Forecast"
                    description="AI-powered prediction of future risk flags based on historical patterns and current trends"
                    defaultExpanded={true}
                  >
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={mockData.predictiveAnalysis}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="upperBound"
                            name="Upper Bound"
                            stroke="transparent"
                            fill={COLORS.prediction}
                            fillOpacity={0.2}
                          />
                          <Area
                            type="monotone"
                            dataKey="lowerBound"
                            name="Lower Bound"
                            stroke="transparent"
                            fill={COLORS.prediction}
                            fillOpacity={0}
                          />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            name="Predicted Flags"
                            stroke={COLORS.prediction}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="lowerBound"
                            name="Lower Bound"
                            stroke={COLORS.prediction}
                            strokeDasharray="3 3"
                            strokeWidth={1}
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="upperBound"
                            name="Upper Bound"
                            stroke={COLORS.prediction}
                            strokeDasharray="3 3"
                            strokeWidth={1}
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Analysis:</span> Based on historical patterns and current trends,
                        our AI predicts an increasing number of risk flags over the next 6 months. The shaded area
                        represents the confidence interval for these predictions.
                      </p>
                      <p className="mt-2">
                        <span className="font-medium">Recommendation:</span> Proactively allocate additional compliance
                        resources starting in August to address the anticipated increase in risk flags. Focus
                        particularly on VAT and Transfer Pricing areas which show the steepest predicted increases.
                      </p>
                    </div>
                  </ExpandableSection>

                  <div className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Sparkles className="h-5 w-5 text-primary mr-2" />
                      AI-Powered Risk Intelligence
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our predictive analytics engine uses machine learning to forecast future risk patterns based on
                      historical data, regulatory changes, and business activity. These insights enable proactive
                      compliance management rather than reactive issue resolution.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-secondary p-3 rounded-md shadow-sm">
                        <h4 className="text-sm font-medium mb-1">Predicted Risk Increase</h4>
                        <div className="text-2xl font-bold text-primary">+72%</div>
                        <p className="text-xs text-muted-foreground">Next 6 months</p>
                      </div>
                      <div className="bg-white dark:bg-secondary p-3 rounded-md shadow-sm">
                        <h4 className="text-sm font-medium mb-1">Top Risk Category</h4>
                        <div className="text-2xl font-bold text-primary">VAT</div>
                        <p className="text-xs text-muted-foreground">Highest growth rate</p>
                      </div>
                      <div className="bg-white dark:bg-secondary p-3 rounded-md shadow-sm">
                        <h4 className="text-sm font-medium mb-1">Potential Savings</h4>
                        <div className="text-2xl font-bold text-primary">{formatCurrency(505000)}</div>
                        <p className="text-xs text-muted-foreground">With proactive measures</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Risk Flags Tab Content */}
          <TabsContent value="risk-flags" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Risk Flags</CardTitle>
                <CardDescription>Comprehensive list of all identified tax compliance issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Risk Flags content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exposure Trends Tab Content */}
          <TabsContent value="exposure-trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Exposure Trends Analysis</CardTitle>
                <CardDescription>Historical and projected tax exposure analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Exposure Trends content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Actions Tab Content */}
          <TabsContent value="legal-actions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Legal Actions & Documentation</CardTitle>
                <CardDescription>Required legal actions and documentation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Legal Actions content will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Flag Detail Dialog */}
      <Dialog open={!!selectedFlag} onOpenChange={handleFlagDialogClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-start gap-2">
              <div className="p-1.5 rounded-md" style={{ backgroundColor: COLORS[selectedFlag?.risk || "neutral"] }}>
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <span>{selectedFlag?.title}</span>
            </DialogTitle>
            <DialogDescription>{selectedFlag?.source}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div>
              <div className="text-sm font-medium mb-1">Risk Level</div>
              <RiskBadge risk={selectedFlag?.risk || "medium"} />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Confidence</div>
              <div>{selectedFlag?.confidence}%</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Financial Impact</div>
              <div>{formatCurrency(selectedFlag?.impact || 0)}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Description</div>
            <p className="text-sm text-muted-foreground">{selectedFlag?.description}</p>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Recommended Actions</div>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Review documentation and verify compliance with {selectedFlag?.source}</li>
              <li>Consult with tax advisor regarding potential exposure</li>
              <li>Prepare documentation for potential tax authority inquiry</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Dismiss Flag</Button>
            <Button>Generate Memo</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
