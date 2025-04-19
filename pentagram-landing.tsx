"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowRight,
    BarChart3,
    FileText,
    Building,
    Sparkles,
    ChevronDown,
    ChevronRight,
    CheckCircle,
} from "lucide-react"
import TaxIntelligenceDashboard from "./tax-intelligence-dashboard"

import LeasesManagementDashboard from "./leases-management-dashboard"
import { Badge } from "@/components/ui/badge"
import RevenueRecognitionDashboard from "./revenue-recognition-dashboard"

/*
  Numio – Financial Intelligence Suite
  Ultra‑polished landing page showcasing multiple products with immersive animations.
  Products: Tax Automation, Revenue Recognition, Leases Management, and more to come.
*/

const stats = [
    { label: "Cost Saved", start: 0, end: 33, suffix: "%" },
    { label: "Time Saved", start: 0, end: 40, suffix: "%" },
    { label: "Less Human Resource", start: 0, end: 25, suffix: "%" },
]

const products = [
    {
        id: "tax",
        name: "Tax Intelligence",
        icon: <BarChart3 className="h-6 w-6" />,
        tagline: "Tax Clarity. Business Certainty",
        description:
            "Our flagship solution elevates tax compliance from a burden to a competitive edge with real-time monitoring, fraud detection, and predictive analytics.",
        features: [
            "Real-time VAT heatmap with ML risk scoring",
            "Invoice integrity AI for fraud & error detection",
            "Predictive audit radar for regulatory compliance",
            "Automated schema validation & duplicate detection",
        ],
        color: "from-primary to-accent",
        image: "/tax-dashboard.jpg",
    },
    {
        id: "revenue",
        name: "Revenue Recognition",
        icon: <FileText className="h-6 w-6" />,
        tagline: "Streamline complex revenue recognition workflows",
        description:
            "Automate revenue recognition across multiple contract types, performance obligations, and variable considerations with precision and compliance.",
        features: [
            "ASC 606 & IFRS 15 compliant recognition engine",
            "Standalone selling price analysis",
            "Contract modification tracking & versioning",
        ],
        color: "from-purple-600 to-pink-500",
        image: "/revenue-dashboard.jpg",
    },
    {
        id: "leases",
        name: "Leases Management",
        icon: <Building className="h-6 w-6" />,
        tagline: "Simplify lease accounting and management",
        description:
            "Comprehensive lease accounting solution that ensures IFRS 16 & ASC 842 compliance while providing powerful analytics for portfolio optimization.",
        features: [
            "Automated lease classification & measurement",
            "Dynamic lease modification handling",
            "Integrated impairment testing",
            "Portfolio-level analytics & optimization",
        ],
        color: "from-emerald-500 to-teal-400",
        image: "/leases-dashboard.jpg",
    },
    {
        id: "future",
        name: "Coming Soon",
        icon: <Sparkles className="h-6 w-6" />,
        tagline: "The future of financial intelligence",
        description:
            "Our R&D team is developing next-generation solutions to address emerging financial challenges with cutting-edge AI and machine learning technologies.",
        features: [
            "Predictive cash flow optimization",
            "Autonomous financial close acceleration",
            "Cross-border transaction harmonization",
            "Regulatory change impact simulation",
        ],
        color: "from-amber-500 to-orange-400",
        image: "/future-concept.jpg",
    },
]

// Logo component with animation
const PentagramLogo = ({ className = "", size = "36" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-120 -120 240 240" width={size} height={size} className={className}>
        {/* Background circle with gradient */}
        <defs>
            <linearGradient id="pentagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" /> {/* primary */}
                <stop offset="50%" stopColor="#8b5cf6" /> {/* highlight */}
                <stop offset="100%" stopColor="#06b6d4" /> {/* accent */}
            </linearGradient>
        </defs>
        {/* Background circle with gradient fill */}
        <circle cx="0" cy="0" r="100" fill="none" stroke="url(#pentagramGradient)" strokeWidth="2" />

        {/* Pentagon with rotation animation - black stroke */}
        <polygon points="0,-115 109.4,-35.5 67.6,93.0 -67.6,93.0 -109.4,-35.5" fill="none" stroke="black" strokeWidth="3">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
        </polygon>
    </svg>
)

// Data Processing Animation Component
const DataProcessingAnimation = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className={`w-full h-auto drop-shadow-xl ${className}`}>
        <defs>
            <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb">
                    <animate
                        attributeName="stop-color"
                        values="#2563eb; #8b5cf6; #06b6d4; #8b5cf6; #2563eb"
                        dur="4s"
                        repeatCount="indefinite"
                    />
                </stop>
                <stop offset="100%" stopColor="#06b6d4">
                    <animate
                        attributeName="stop-color"
                        values="#06b6d4; #2563eb; #8b5cf6; #2563eb; #06b6d4"
                        dur="4s"
                        repeatCount="indefinite"
                    />
                </stop>
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Background */}
        <rect width="800" height="400" fill="#f8fafc" rx="15" />

        {/* Central Pentagram logo */}
        <g transform="translate(400, 200)">
            <circle cx="0" cy="0" r="60" fill="white" stroke="url(#dataGradient)" strokeWidth="2" />
            <polygon
                points="0,-50 47.6,-14.7 29.4,38.8 -29.4,38.8 -47.6,-14.7"
                fill="none"
                stroke="url(#dataGradient)"
                strokeWidth="2"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to="360"
                    dur="10s"
                    repeatCount="indefinite"
                />
            </polygon>
        </g>

        {/* Data streams flowing into the center */}
        <g>
            {/* Stream 1 */}
            <path
                d="M100,100 C200,150 300,100 400,200"
                fill="none"
                stroke="url(#pulseGradient)"
                strokeWidth="3"
                strokeDasharray="10,5"
            >
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite" />
            </path>
            {/* Data packets on stream 1 */}
            <circle cx="0" cy="0" r="6" fill="#2563eb">
                <animateMotion path="M100,100 C200,150 300,100 400,200" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Stream 2 */}
            <path
                d="M700,100 C600,150 500,100 400,200"
                fill="none"
                stroke="url(#pulseGradient)"
                strokeWidth="3"
                strokeDasharray="10,5"
            >
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="4s" repeatCount="indefinite" />
            </path>
            {/* Data packets on stream 2 */}
            <circle cx="0" cy="0" r="6" fill="#06b6d4">
                <animateMotion path="M700,100 C600,150 500,100 400,200" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Stream 3 */}
            <path
                d="M100,300 C200,250 300,300 400,200"
                fill="none"
                stroke="url(#pulseGradient)"
                strokeWidth="3"
                strokeDasharray="10,5"
            >
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3.5s" repeatCount="indefinite" />
            </path>
            {/* Data packets on stream 3 */}
            <rect x="-5" y="-5" width="10" height="10" fill="#2563eb" rx="2">
                <animateMotion path="M100,300 C200,250 300,300 400,200" dur="3.5s" repeatCount="indefinite" />
            </rect>

            {/* Stream 4 */}
            <path
                d="M700,300 C600,250 500,300 400,200"
                fill="none"
                stroke="url(#pulseGradient)"
                strokeWidth="3"
                strokeDasharray="10,5"
            >
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="4.5s" repeatCount="indefinite" />
            </path>
            {/* Data packets on stream 4 */}
            <polygon points="0,-6 6,6 -6,6" fill="#2563eb">
                <animateMotion path="M700,300 C600,250 500,300 400,200" dur="4.5s" repeatCount="indefinite" />
            </polygon>
        </g>

        {/* Data visualization elements emerging from the center */}
        <g>
            {/* Bar chart */}
            <g transform="translate(480, 100)">
                <rect x="0" y="0" width="15" height="0" fill="#2563eb" rx="2">
                    <animate attributeName="height" from="0" to="40" dur="1s" begin="1s" fill="freeze" />
                </rect>
                <rect x="20" y="0" width="15" height="0" fill="#8b5cf6" rx="2">
                    <animate attributeName="height" from="0" to="60" dur="1s" begin="1.2s" fill="freeze" />
                </rect>
                <rect x="40" y="0" width="15" height="0" fill="#06b6d4" rx="2">
                    <animate attributeName="height" from="0" to="30" dur="1s" begin="1.4s" fill="freeze" />
                </rect>
                <rect x="60" y="0" width="15" height="0" fill="#facc15" rx="2">
                    <animate attributeName="height" from="0" to="50" dur="1s" begin="1.6s" fill="freeze" />
                </rect>
            </g>

            {/* Line chart */}
            <g transform="translate(250, 100)">
                <path d="M0,40 L0,40" fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round">
                    <animate
                        attributeName="d"
                        from="M0,40 L0,40"
                        to="M0,40 L20,20 L40,30 L60,10 L80,25"
                        dur="2s"
                        begin="1.8s"
                        fill="freeze"
                    />
                </path>
                <circle cx="0" cy="40" r="4" fill="#06b6d4" opacity="0">
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="1.8s" fill="freeze" />
                </circle>
                <circle cx="20" cy="20" r="4" fill="#06b6d4" opacity="0">
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2s" fill="freeze" />
                </circle>
                <circle cx="40" cy="30" r="4" fill="#06b6d4" opacity="0">
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.2s" fill="freeze" />
                </circle>
                <circle cx="60" cy="10" r="4" fill="#06b6d4" opacity="0">
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.4s" fill="freeze" />
                </circle>
                <circle cx="80" cy="25" r="4" fill="#06b6d4" opacity="0">
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.6s" fill="freeze" />
                </circle>
            </g>

            {/* Pie chart */}
            <g transform="translate(250, 280)">
                <path d="M0,0 L0,0 A0,0 0 0,0 0,0 z" fill="#2563eb" opacity="0">
                    <animate
                        attributeName="d"
                        from="M0,0 L0,0 A0,0 0 0,0 0,0 z"
                        to="M34,34 L34,0 A34,34 0 0,1 68,34 z"
                        dur="1s"
                        begin="2.8s"
                        fill="freeze"
                    />
                    <animate attributeName="opacity" from="0" to="1" dur="1.0s" begin="2.8s" fill="freeze" />
                </path>
                <path d="M0,0 L0,0 A0,0 0 0,0 0,0 z" fill="#8b5cf6" opacity="0">
                    <animate
                        attributeName="d"
                        from="M0,0 L0,0 A0,0 0 0,0 0,0 z"
                        to="M34,34 L68,34 A34,34 0 0,1 34,68 z"
                        dur="1s"
                        begin="2.8s"
                        fill="freeze"
                    />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.8s" fill="freeze" />
                </path>
                <path d="M0,0 L0,0 A0,0 0 0,0 0,0 z" fill="#06b6d4" opacity="0">
                    <animate
                        attributeName="d"
                        from="M0,0 L0,0 A0,0 0 0,0 0,0 z"
                        to="M34,34 L34,68 A34,34 0 0,1 0,34 z"
                        dur="1s"
                        begin="2.8s"
                        fill="freeze"
                    />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.8s" fill="freeze" />
                </path>
                <path d="M0,0 L0,0 A0,0 0 0,0 0,0 z" fill="#facc15" opacity="0">
                    <animate
                        attributeName="d"
                        from="M0,0 L0,0 A0,0 0 0,0 0,0 z"
                        to="M34,34 L0,34 A34,34 0 0,1 34,0 z"
                        dur="1s"
                        begin="2.8s"
                        fill="freeze"
                    />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="2.8" fill="freeze" />
                </path>
            </g>

            {/* Scatter plot */}
            <g transform="translate(480, 280)">
                <circle cx="10" cy="30" r="0" fill="#2563eb" opacity="0">
                    <animate attributeName="r" from="0" to="5" dur="0.5s" begin="3.6s" fill="freeze" />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3.6s" fill="freeze" />
                </circle>
                <circle cx="25" cy="15" r="0" fill="#8b5cf6" opacity="0">
                    <animate attributeName="r" from="0" to="7" dur="0.5s" begin="3.7s" fill="freeze" />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3.7s" fill="freeze" />
                </circle>
                <circle cx="40" cy="45" r="0" fill="#06b6d4" opacity="0">
                    <animate attributeName="r" from="0" to="6" dur="0.5s" begin="3.8s" fill="freeze" />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3.8s" fill="freeze" />
                </circle>
                <circle cx="55" cy="25" r="0" fill="#facc15" opacity="0">
                    <animate attributeName="r" from="0" to="8" dur="0.5s" begin="3.9s" fill="freeze" />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3.9s" fill="freeze" />
                </circle>
                <circle cx="70" cy="35" r="0" fill="#2563eb" opacity="0">
                    <animate attributeName="r" from="0" to="4" dur="0.5s" begin="4s" fill="freeze" />
                    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="4s" fill="freeze" />
                </circle>
            </g>
        </g>

        {/* Pulsing glow effect around the center */}
        <circle cx="400" cy="200" r="70" fill="none" stroke="url(#pulseGradient)" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="r" values="70; 75; 70" dur="3s" repeatCount="indefinite" />
            <animate attributeName="stroke-width" values="2; 4; 2" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7; 0.3; 0.7" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Text labels */}
        <text x="400" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
            Real-Time Financial Data Processing
        </text>
        <text x="400" y="55" textAnchor="middle" fontSize="14" fill="#64748b">
            Transforming complex data into actionable insights
        </text>

        {/* Data source labels */}
        <text x="100" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">
            Transactions
        </text>
        <text x="700" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#06b6d4">
            Market Data
        </text>
        <text x="100" y="320" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8b5cf6">
            Regulations
        </text>
        <text x="700" y="320" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#facc15">
            Business Events
        </text>

        {/* Chart labels - positioned precisely at the center of each chart */}
        {/* Bar chart label (top right) - centered over the bar chart which starts at x=480 and is about 80px wide */}
        <text x="515" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
            Risk Analysis
        </text>

        {/* Line chart label (top left) - centered over the line chart which starts at x=250 and is about 80px wide */}
        <text x="290" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
            Compliance Trends
        </text>

        {/* Pie chart label (bottom left) - centered over the pie chart which starts at x=250 and is about 80px wide */}
        <text x="285" y="360" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
            Tax Exposure
        </text>

        {/* Scatter plot label (bottom right) - centered over the scatter plot which starts at x=480 and is about 80px wide */}
        <text x="520" y="360" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
            Opportunity Matrix
        </text>
    </svg>
)

// Team Collaboration Visualization
const TeamCollaborationVisualization = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className={`w-full h-auto drop-shadow-xl ${className}`}>
        <defs>
            <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="pentaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="chartGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="800" height="400" fill="url(#teamGradient)" rx="20" />

        {/* Central Pentagram logo with rotation - properly centered and scaled */}
        <g transform="translate(400, 200)">
            <circle cx="0" cy="0" r="60" fill="white" stroke="url(#pentaGradient)" strokeWidth="3" />
            <polygon
                points="0,-45 42.8,-13.9 26.5,35.3 -26.5,35.3 -42.8,-13.9"
                fill="none"
                stroke="url(#pentaGradient)"
                strokeWidth="3"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to="360"
                    dur="20s"
                    repeatCount="indefinite"
                />
            </polygon>
        </g>

        {/* Team members with pulsing effect */}
        <g>
            {/* Team member 1 - Financial Expert */}
            <circle cx="200" cy="150" r="50" fill="white" stroke="#2563eb" strokeWidth="2">
                <animate attributeName="r" values="50; 52; 50" dur="3s" repeatCount="indefinite" />
            </circle>
            <g transform="translate(200, 150)">
                <text x="0" y="-8" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#2563eb">
                    Financial
                </text>
                <text x="0" y="12" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#2563eb">
                    Expert
                </text>
            </g>

            {/* Connection line with moving dots */}
            <line x1="250" y1="150" x2="320" y2="200" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
            </line>
            <circle cx="0" cy="0" r="3" fill="#2563eb">
                <animateMotion path="M250,150 L320,200" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Team member 2 - Tax Strategist */}
            <circle cx="200" cy="280" r="50" fill="white" stroke="#8b5cf6" strokeWidth="2">
                <animate attributeName="r" values="50; 52; 50" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <g transform="translate(200, 280)">
                <text x="0" y="-8" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#8b5cf6">
                    Tax
                </text>
                <text x="0" y="12" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#8b5cf6">
                    Strategist
                </text>
            </g>

            {/* Connection line with moving dots */}
            <line x1="250" y1="280" x2="320" y2="200" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
            </line>
            <circle cx="0" cy="0" r="3" fill="#8b5cf6">
                <animateMotion path="M250,280 L320,200" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Team member 3 - Tech Innovator */}
            <circle cx="600" cy="150" r="50" fill="white" stroke="#06b6d4" strokeWidth="2">
                <animate attributeName="r" values="50; 52; 50" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <g transform="translate(600, 150)">
                <text x="0" y="-8" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#06b6d4">
                    Tech
                </text>
                <text x="0" y="12" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#06b6d4">
                    Innovator
                </text>
            </g>

            {/* Connection line with moving dots */}
            <line x1="550" y1="150" x2="480" y2="200" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
            </line>
            <circle cx="0" cy="0" r="3" fill="#06b6d4">
                <animateMotion path="M550,150 L480,200" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Team member 4 - Data Scientist */}
            <circle cx="600" cy="280" r="50" fill="white" stroke="#facc15" strokeWidth="2">
                <animate attributeName="r" values="50; 52; 50" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>
            <g transform="translate(600, 280)">
                <text x="0" y="-8" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#facc15">
                    Data
                </text>
                <text x="0" y="12" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#facc15">
                    Scientist
                </text>
            </g>

            {/* Connection line with moving dots */}
            <line x1="550" y1="280" x2="480" y2="200" stroke="#facc15" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
            </line>
            <circle cx="0" cy="0" r="3" fill="#facc15">
                <animateMotion path="M550,280 L480,200" dur="2s" repeatCount="indefinite" />
            </circle>
        </g>

        {/* Rest of the SVG content remains unchanged */}
        {/* Data visualization elements with animations */}
        <g transform="translate(300, 80)">
            {/* Bar chart with growing bars */}
            <rect x="0" y="40" width="15" height="0" fill="url(#chartGradient)" rx="2">
                <animate attributeName="height" from="0" to="40" dur="1.5s" begin="0.5s" fill="freeze" />
                <animate attributeName="y" from="40" to="0" dur="1.5s" begin="0.5s" fill="freeze" />
            </rect>
            <rect x="20" y="40" width="15" height="0" fill="url(#chartGradient)" rx="2">
                <animate attributeName="height" from="0" to="30" dur="1.5s" begin="0.7s" fill="freeze" />
                <animate attributeName="y" from="40" to="10" dur="1.5s" begin="0.7s" fill="freeze" />
            </rect>
            <rect x="40" y="40" width="15" height="0" fill="url(#chartGradient)" rx="2">
                <animate attributeName="height" from="0" to="35" dur="1.5s" begin="0.9s" fill="freeze" />
                <animate attributeName="y" from="40" to="5" dur="1.5s" begin="0.9s" fill="freeze" />
            </rect>
        </g>

        <g transform="translate(480, 80)">
            {/* Line chart with drawing effect */}
            <path d="M0,30 L0,30" fill="none" stroke="#06b6d4" strokeWidth="2">
                <animate
                    attributeName="d"
                    from="M0,30 L0,30"
                    to="M0,30 L20,15 L40,25 L60,5"
                    dur="2s"
                    begin="1s"
                    fill="freeze"
                />
            </path>
            <circle cx="0" cy="30" r="3" fill="#06b6d4" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="1s" fill="freeze" />
            </circle>
            <circle cx="20" cy="15" r="3" fill="#06b6d4" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="1.3s" fill="freeze" />
            </circle>
            <circle cx="40" cy="25" r="3" fill="#06b6d4" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="1.6s" fill="freeze" />
            </circle>
            <circle cx="60" cy="5" r="3" fill="#06b6d4" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="1.9s" fill="freeze" />
            </circle>
        </g>

        <g transform="translate(300, 280)">
            {/* Pie chart with slice animations */}
            <path d="M30,30 L30,0 A30,30 0 0,1 60,30 Z" fill="#8b5cf6" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.2s" fill="freeze" />
            </path>
            <path d="M30,30 L60,30 A30,30 0 0,1 30,60 Z" fill="#2563eb" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.4s" fill="freeze" />
            </path>
            <path d="M30,30 L30,60 A30,30 0 0,1 0,30 Z" fill="#06b6d4" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.6s" fill="freeze" />
            </path>
            <path d="M30,30 L0,30 A30,30 0 0,1 30,0 Z" fill="#facc15" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.8s" fill="freeze" />
            </path>
        </g>

        {/* Document icons with staggered appearance */}
        <g transform="translate(480, 280)">
            <rect x="0" y="0" width="30" height="40" fill="white" stroke="#2563eb" strokeWidth="1" rx="2" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2s" fill="freeze" />
            </rect>
            <line x1="5" y1="10" x2="25" y2="10" stroke="#2563eb" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.1s" fill="freeze" />
            </line>
            <line x1="5" y1="15" x2="25" y2="15" stroke="#2563eb" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.2s" fill="freeze" />
            </line>
            <line x1="5" y1="20" x2="25" y2="20" stroke="#2563eb" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.3s" fill="freeze" />
            </line>
            <line x1="5" y1="25" x2="15" y2="25" stroke="#2563eb" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.4s" fill="freeze" />
            </line>

            <rect x="10" y="5" width="30" height="40" fill="white" stroke="#8b5cf6" strokeWidth="1" rx="2" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.2s" fill="freeze" />
            </rect>
            <line x1="15" y1="15" x2="35" y2="15" stroke="#8b5cf6" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.3s" fill="freeze" />
            </line>
            <line x1="15" y1="20" x2="35" y2="20" stroke="#8b5cf6" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.4s" fill="freeze" />
            </line>
            <line x1="15" y1="25" x2="35" y2="25" stroke="#8b5cf6" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.5s" fill="freeze" />
            </line>
            <line x1="15" y1="30" x2="25" y2="30" stroke="#8b5cf6" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.6s" fill="freeze" />
            </line>

            <rect x="20" y="10" width="30" height="40" fill="white" stroke="#06b6d4" strokeWidth="1" rx="2" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.4s" fill="freeze" />
            </rect>
            <line x1="25" y1="20" x2="45" y2="20" stroke="#06b6d4" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.5s" fill="freeze" />
            </line>
            <line x1="25" y1="25" x2="45" y2="25" stroke="#06b6d4" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.6s" fill="freeze" />
            </line>
            <line x1="25" y1="30" x2="45" y2="30" stroke="#06b6d4" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.7s" fill="freeze" />
            </line>
            <line x1="25" y1="35" x2="35" y2="35" stroke="#06b6d4" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.8s" fill="freeze" />
            </line>
        </g>

        {/* Connecting lines between data elements with animated dashes - adjusted to not overlap the central circle */}
        <line x1="320" y1="100" x2="480" y2="100" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,3">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="320" y1="300" x2="480" y2="300" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="320" y1="100" x2="320" y2="300" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3,3">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="480" y1="100" x2="480" y2="300" stroke="#facc15" strokeWidth="1" strokeDasharray="3,3">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Title */}
        <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
            Collaborative Financial Intelligence
        </text>
        <text x="400" y="50" textAnchor="middle" fontSize="12" fill="#64748b">
            Where expertise meets technology to transform financial operations
        </text>
    </svg>
)

// Calendar booking URL
const CALENDAR_URL =
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3-UydaYC9OosZwLXotWsj2zwRyzzsN1oQH6HHXV8W74UDK7qc-cUUr9Be1x59QKphr8_7xtX2Z"

export default function PentagramLandingPage() {
    const [counters, setCounters] = useState(stats.map((s) => s.start))
    const controls = useAnimation()
    const [dark, setDark] = useState(false)
    const [activeProduct, setActiveProduct] = useState("tax")
    const [isIntersecting, setIsIntersecting] = useState(false)
    const productsRef = useRef(null)

    /* -------- animated counters -------- */
    useEffect(() => {
        const timers = stats.map((s, i) => {
            const increment = Math.ceil(s.end / 120)
            return setInterval(() => {
                setCounters((prev) => {
                    const next = [...prev]
                    next[i] = Math.min(next[i] + increment, s.end)
                    return next
                })
            }, 16)
        })
        return () => timers.forEach(clearInterval)
    }, [])

    /* -------- subtle gradient shift for hero bg -------- */
    useEffect(() => {
        controls.start({
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        })
    }, [controls])

    /* -------- intersection observer for products section -------- */
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting)
            },
            { threshold: 0.1 },
        )

        if (productsRef.current) {
            observer.observe(productsRef.current)
        }

        return () => {
            if (productsRef.current) {
                observer.unobserve(productsRef.current)
            }
        }
    }, [])

    return (
        <div
            className={`${dark ? "dark" : ""} font-sans relative overflow-x-hidden min-h-screen bg-white dark:bg-secondary`}
        >
            {/* global moving gradient backdrop */}
            <motion.div
                aria-hidden
                animate={controls}
                className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-r from-primary via-highlight to-accent opacity-10 bg-[length:300%_300%]"
            />

            {/* ------------------------------------------------------------------ HERO */}
            <section className="relative overflow-hidden min-h-[100vh] flex flex-col items-center justify-center text-center px-2 sm:px-6 py-10">
                {/* texture overlay */}
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 2.5 }}
                    className="absolute inset-0 -z-10 bg-[url('/noise.png')] bg-repeat opacity-20 pointer-events-none"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-8"
                >
                    <PentagramLogo size="150" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="text-4xl sm:text-5xl md:text-7xl font-extrabold max-w-4xl leading-[1.2] bg-gradient-to-r from-primary via-accent to-highlight bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.07)] px-4 mb-8"
                    style={{ lineHeight: "1.3" }}
                >
                    Financial Intelligence.
                    <br />
                    Reimagined.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    className="mt-2 max-w-xl text-base sm:text-lg text-slate-700 dark:text-slate-300 px-4"
                >
                    Numio's suite of intelligent financial solutions transforms complex data into strategic insights, elevating
                    financial operations from a burden to a competitive advantage.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 px-4 relative"
                >
                    <Button
                        size="default"
                        className="relative overflow-hidden px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-br from-primary to-accent text-white font-semibold shadow-xl hover:brightness-110 text-sm sm:text-base"
                        onClick={() => {
                            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                        }}
                    >
                        <span className="relative z-10 flex items-center">
                            Explore Our Solutions
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                        <motion.span
                            aria-hidden
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 bg-white/20"
                        />
                    </Button>
                    <Button
                        variant="outline"
                        size="default"
                        className="border-primary dark:border-accent text-sm sm:text-base"
                        onClick={() => window.open(CALENDAR_URL, "_blank")}
                    >
                        Schedule a Demo
                    </Button>
                </motion.div>

                {/* scroll cue - moved inside the content area */}
                <motion.button
                    onClick={() => {
                        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    className="mt-16 flex flex-col items-center text-primary dark:text-accent border-none bg-transparent cursor-pointer"
                >
                    <span className="text-sm mb-2">Discover Our Products</span>
                    <ChevronDown className="h-6 w-6" />
                </motion.button>
            </section>

            {/* ------------------------------------------------------------------ PRODUCTS SHOWCASE */}
            <section
                id="products"
                ref={productsRef}
                className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-primary/5 dark:bg-secondary/80 pb-10"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-white mb-4"
                        >
                            Our Product Suite
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
                        >
                            Comprehensive financial intelligence solutions designed for the modern enterprise
                        </motion.p>
                    </div>

                    <Tabs defaultValue="tax" value={activeProduct} onValueChange={setActiveProduct} className="w-full">
                        <div className="flex justify-center mb-12">
                            <TabsList className="flex">
                                {products.map((product) => (
                                    <TabsTrigger
                                        key={product.id}
                                        value={product.id}
                                        className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 dark:data-[state=active]:from-primary/30 dark:data-[state=active]:to-accent/30"
                                    >
                                        {product.icon}
                                        <span className="hidden sm:inline">{product.name}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <div className="relative mb-10">
                            {products.map((product) => (
                                <TabsContent
                                    key={product.id}
                                    value={product.id}
                                    className={`w-full ${activeProduct === product.id ? "block" : "hidden"}`}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                            className="grid md:grid-cols-2 gap-8 items-center"
                                        >
                                            <div className="order-2 md:order-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${product.color} text-white`}>
                                                        {product.icon}
                                                    </div>
                                                    <h3 className="text-2xl sm:text-3xl font-bold text-secondary dark:text-white">
                                                        {product.name}
                                                    </h3>
                                                </div>
                                                <p className="text-lg sm:text-xl font-medium text-primary dark:text-accent mb-4">
                                                    {product.tagline}
                                                </p>
                                                <p className="text-slate-600 dark:text-slate-300 mb-6">{product.description}</p>

                                                <ul className="space-y-3 mb-8">
                                                    {product.features.map((feature, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: i * 0.1 }}
                                                            className="flex items-start"
                                                        >
                                                            <CheckCircle className="h-5 w-5 text-primary dark:text-accent mt-0.5 mr-3 flex-shrink-0" />
                                                            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>

                                                <Button
                                                    className={`bg-gradient-to-r ${product.color} text-white hover:brightness-110 transition-all`}
                                                    onClick={() => window.open(CALENDAR_URL, "_blank")}
                                                >
                                                    <span className="flex items-center">
                                                        Schedule a Demo
                                                        <ChevronRight className="ml-1 h-4 w-4" />
                                                    </span>
                                                </Button>
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="order-1 md:order-2 relative"
                                            >
                                                {product.id === "tax" ? (
                                                    <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white dark:border-secondary">
                                                        <div className="h-[500px] overflow-hidden">
                                                            <TaxIntelligenceDashboard embedded={true} />
                                                        </div>
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-transparent pointer-events-none" />
                                                    </div>
                                                ) : product.id === "revenue" ? (
                                                    <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white dark:border-secondary">
                                                        <div className="h-[500px] overflow-hidden">
                                                            <RevenueRecognitionDashboard embedded={true} />
                                                        </div>
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-transparent pointer-events-none" />
                                                    </div>
                                                ) : product.id === "leases" ? (
                                                    <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white dark:border-secondary">
                                                        <div className="h-[500px] overflow-hidden">
                                                            <LeasesManagementDashboard embedded={true} />
                                                        </div>
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-transparent pointer-events-none" />
                                                    </div>
                                                ) : (
                                                    (product.id === "future" && (
                                                        <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white dark:border-secondary">
                                                            <div className="h-[500px] overflow-hidden bg-gradient-to-br from-amber-500/5 to-orange-400/5 flex items-center justify-center">
                                                                <div className="text-center p-8 max-w-md">
                                                                    <div className="mb-10 flex justify-center">
                                                                        <div className="relative">
                                                                            <Sparkles className="h-20 w-20 text-amber-500" />
                                                                            <motion.div
                                                                                animate={{
                                                                                    scale: [1, 1.2, 1],
                                                                                    opacity: [0.3, 0.7, 0.3],
                                                                                }}
                                                                                transition={{
                                                                                    duration: 4,
                                                                                    repeat: Number.POSITIVE_INFINITY,
                                                                                    repeatType: "reverse",
                                                                                }}
                                                                                className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
                                                                        Coming Soon
                                                                    </h3>

                                                                    <div className="h-px w-24 mx-auto bg-gradient-to-r from-amber-500 to-orange-400 mb-6"></div>

                                                                    <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                                                                        Our next-generation financial intelligence platform is currently in development.
                                                                    </p>

                                                                    <div className="flex justify-center gap-3 mb-8">
                                                                        {["Q4", "2025"].map((text, i) => (
                                                                            <motion.div
                                                                                key={i}
                                                                                initial={{ opacity: 0 }}
                                                                                animate={{ opacity: 1 }}
                                                                                transition={{ delay: 0.5 + i * 0.2 }}
                                                                                className="w-16 h-16 rounded-lg bg-white dark:bg-slate-800/50 shadow-md flex items-center justify-center"
                                                                            >
                                                                                <span className="text-xl font-bold text-amber-500">{text}</span>
                                                                            </motion.div>
                                                                        ))}
                                                                    </div>

                                                                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0">
                                                                        Be the first to know
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-transparent pointer-events-none" />
                                                        </div>
                                                    )) || (
                                                        <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white dark:border-secondary aspect-[4/3]">
                                                            <img
                                                                src={product.image || "/placeholder.svg?height=600&width=800"}
                                                                alt={`${product.name} dashboard`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                                                        </div>
                                                    )
                                                )}



                                                <motion.div
                                                    animate={{
                                                        rotate: [0, 2, 0, -2, 0],
                                                        scale: [1, 1.02, 1, 1.02, 1],
                                                    }}
                                                    transition={{
                                                        duration: 8,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        repeatType: "reverse",
                                                    }}
                                                    className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full opacity-30 blur-xl"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </TabsContent>
                            ))}
                        </div>
                    </Tabs>
                </div>
            </section>

            {/* ------------------------------------------------------------------ PLATFORM BENEFITS */}
            <section id="platform" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden pt-10 mt-10">
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.07, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="absolute -z-10 inset-0 bg-[url('/hex.svg')] bg-cover rotate-6"
                />
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-white mb-4"
                        >
                            Unified Platform Architecture
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
                        >
                            All our solutions are built on a common platform, providing seamless integration and consistent experience
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Unified Data Model",
                                description: "Single source of truth across all financial processes with real-time synchronization",
                                icon: "🔄",
                            },
                            {
                                title: "AI-Powered Analytics",
                                description: "Advanced machine learning algorithms that continuously improve with your data",
                                icon: "🧠",
                            },
                            {
                                title: "Enterprise Security",
                                description: "Bank-grade encryption, role-based access control, and comprehensive audit trails",
                                icon: "🔒",
                            },
                            {
                                title: "Seamless Integration",
                                description: "Connect with your existing ERP, CRM, and financial systems through robust APIs",
                                icon: "🔌",
                            },
                            {
                                title: "Regulatory Compliance",
                                description: "Built-in compliance with IFRS, GAAP, and local regulatory requirements",
                                icon: "📜",
                            },
                            {
                                title: "Scalable Architecture",
                                description: "Handles enterprise-scale data volumes with consistent performance",
                                icon: "📈",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Card className="h-full border-0 shadow-lg bg-white/90 dark:bg-secondary/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <h3 className="text-xl font-bold mb-2 text-secondary dark:text-white">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------------ IMPACT COUNTERS */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-primary/5 dark:bg-secondary/80">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-white mb-14"
                    >
                        Measurable Impact
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-5xl font-extrabold tabular-nums bg-gradient-to-r from-primary via-highlight to-accent bg-clip-text text-transparent">
                                    {counters[i].toLocaleString()}
                                    {s.suffix || ""}
                                </span>
                                <span className="mt-2 text-slate-600 dark:text-slate-300 text-lg tracking-wide">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------------ VISUALIZATIONS */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.07, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="absolute -z-10 inset-0 bg-[url('/noise.png')] bg-repeat opacity-20"
                />
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-white mb-4"
                        >
                            How Our Technology Works
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
                        >
                            Visualizing the complex systems that power our financial intelligence platform
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* First Visualization */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-6"
                            >
                                <h3 className="text-2xl font-bold text-secondary dark:text-white mb-3">
                                    Real-Time Financial Data Processing
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Our advanced algorithms transform raw financial data into actionable insights in real-time
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700"
                            >
                                <DataProcessingAnimation />
                            </motion.div>
                        </div>

                        {/* Second Visualization */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-6"
                            >
                                <h3 className="text-2xl font-bold text-secondary dark:text-white mb-3">
                                    Collaborative Financial Intelligence
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Our platform connects financial experts, data scientists, and technology innovators to deliver
                                    comprehensive solutions
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700"
                            >
                                <TeamCollaborationVisualization />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------------ COMPANY */}
            <section
                id="company"
                className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50 dark:from-secondary dark:to-secondary/95"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-4"
                        >
                            <div className="bg-primary/10 dark:bg-primary/20 px-4 py-1 rounded-full">
                                <span className="text-primary dark:text-primary-foreground font-medium">Our Team</span>
                            </div>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-white mb-4"
                        >
                            Our Vision & Leadership
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
                        >
                            Founded by top‑tier financial experts, Numio is on a mission to transform financial operations
                        </motion.p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        {/* Left column - Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-5 bg-white dark:bg-secondary/60 p-8 rounded-2xl shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white">
                                    <PentagramLogo size="32" />
                                </div>
                                <h3 className="text-2xl font-bold text-secondary dark:text-white">Our Mission</h3>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                Founded by top‑tier tax strategists, visionaries and accountants, Numio is on a mission to blend
                                rigorous compliance with fintech agility – empowering organisations to move faster, smarter, and
                                fearlessly.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    { title: "Innovation", description: "Pioneering AI-driven financial intelligence solutions" },
                                    { title: "Compliance", description: "Ensuring regulatory adherence across global jurisdictions" },
                                    {
                                        title: "Efficiency",
                                        description: "Streamlining complex financial processes for maximum productivity",
                                    },
                                ].map((value, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="flex gap-3"
                                    >
                                        <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 h-6 w-6 flex items-center justify-center mt-0.5">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-secondary dark:text-white">{value.title}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{value.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white"
                                onClick={() => window.open(CALENDAR_URL, "_blank")}
                            >
                                Join Our Journey
                            </Button>
                        </motion.div>

                        {/* Right column - Leadership */}
                        <div className="lg:col-span-7">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        name: "Aviv Ben Simchon",
                                        role: "CEO & Financial Visionary",
                                        bio: "Senior manager at big4 in indirect tax, guiding product strategy & regulatory alignment. Member at the Tax Committee, Institute of CPAs in Israel; Leading national e-Invoicing implementation with ITA. ex-ITA",
                                        img: "/ABS.jpeg",
                                        color: "from-primary to-accent",
                                    },
                                    {
                                        name: "Almog Dror",
                                        role: "COO & Operations Strategist",
                                        bio: "Accounting Tools & Automation Developer, Data Analyst and Accountant with expertise in capital markets and programming in various fields.",
                                        img: "/almog-dror.jpeg",
                                        color: "from-purple-600 to-pink-500",
                                    },
                                    {
                                        name: "Yuval Chen",
                                        role: "CTO & Technology Lead",
                                        bio: "Full Stack Developer & Automation Developer With Expertise in Financial Markets and AI integration for financial systems.",
                                        img: "/YuvalChen.jpeg",
                                        color: "from-emerald-500 to-teal-400",
                                    },
                                    {
                                        name: "Join Our Team",
                                        role: "Open Positions",
                                        bio: "We're looking for talented individuals passionate about financial technology and innovation to join our growing team.",
                                        img: "/placeholder.svg?height=200&width=200",
                                        color: "from-amber-500 to-orange-400",
                                        isPlaceholder: true,
                                    },
                                ].map((member, i) => (
                                    <motion.div
                                        key={member.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="bg-white dark:bg-secondary/60 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <div className={`h-3 bg-gradient-to-r ${member.color}`}></div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="relative">
                                                    <div
                                                        className={`w-16 h-16 rounded-full overflow-hidden border-2 border-gradient-to-r ${member.color} flex items-center justify-center bg-white`}
                                                    >
                                                        {member.isPlaceholder ? (
                                                            <Sparkles className="h-8 w-8 text-amber-500" />
                                                        ) : (
                                                            <img
                                                                src={member.img || "/placeholder.svg"}
                                                                alt={member.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    {!member.isPlaceholder && (
                                                        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-secondary rounded-full p-0.5">
                                                            <PentagramLogo size="16" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-secondary dark:text-white text-lg">{member.name}</h4>
                                                    <p
                                                        className={`text-xs ${member.isPlaceholder ? "text-amber-500" : "text-highlight dark:text-accent"}`}
                                                    >
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{member.bio}</p>

                                            {member.isPlaceholder && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-4 w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                                                >
                                                    View Careers
                                                </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------------ CTA */}
            <section className="relative bg-gradient-to-r from-primary to-highlight py-16 sm:py-20 px-4 sm:px-6 text-center text-white overflow-hidden">
                <motion.div
                    aria-hidden
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-white/30"
                />
                <h3 className="text-3xl sm:text-4xl font-extrabold mb-6 drop-shadow-lg">
                    Experience the Future of Financial Intelligence
                </h3>
                <p className="mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg">
                    Schedule a personalized walkthrough and discover how Numio's suite of solutions can transform your financial
                    operations.
                </p>
                <Button
                    size="default"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 shadow-lg text-sm sm:text-base"
                    onClick={() => window.open(CALENDAR_URL, "_blank")}
                >
                    Book Your Demo
                </Button>
            </section>

            {/* ------------------------------------------------------------------ FOOTER */}
            <footer id="contact" className="py-8 sm:py-10 px-4 sm:px-6 bg-secondary text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                    <p>© {new Date().getFullYear()} Numio Analytics Ltd. All rights reserved.</p>
                    <div className="space-x-4">
                        <a href="/privacy" className="hover:text-white">
                            Privacy
                        </a>
                        <a href="/terms" className="hover:text-white">
                            Terms
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}