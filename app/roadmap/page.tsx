"use client"

import React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Map,
  CheckCircle,
  Circle,
  Target,
  BookOpen,
  Award,
  Briefcase,
  Shield,
  Cloud,
  Palette,
  BarChart,
  Cpu,
  Database,
} from "lucide-react"

interface RoadmapStep {
  id: string
  title: string
  description: string
  type: "skill" | "certification" | "project" | "experience"
  completed: boolean
  estimatedTime: string
}

interface CareerRoadmap {
  id: string
  title: string
  description: string
  category: string
  steps: RoadmapStep[]
}

export default function RoadmapPage() {
  const [selectedCareer, setSelectedCareer] = useState("")
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const roadmaps: CareerRoadmap[] = [
    {
      id: "cybersecurity-analyst",
      title: "Cybersecurity Analyst",
      description: "Information security and threat analysis career path",
      category: "Security",
      steps: [
        {
          id: "cs1",
          title: "IT Fundamentals",
          description: "Learn networking, operating systems, and basic IT concepts",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "cs2",
          title: "Security Fundamentals",
          description: "Understand CIA triad, risk management, and security frameworks",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "cs3",
          title: "Network Security",
          description: "Learn firewalls, VPNs, IDS/IPS, and network protocols",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "cs4",
          title: "Security+ Certification",
          description: "Obtain CompTIA Security+ certification",
          type: "certification",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "cs5",
          title: "Incident Response Project",
          description: "Create an incident response plan and simulate attacks",
          type: "project",
          completed: false,
          estimatedTime: "1 month",
        },
        {
          id: "cs6",
          title: "SIEM Tools",
          description: "Master Splunk, QRadar, or similar SIEM platforms",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "cs7",
          title: "Vulnerability Assessment",
          description: "Learn penetration testing and vulnerability scanning",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "cs8",
          title: "SOC Analyst Role",
          description: "Gain experience in a Security Operations Center",
          type: "experience",
          completed: false,
          estimatedTime: "6+ months",
        },
      ],
    },
    {
      id: "cloud-security",
      title: "Cloud Security Specialist",
      description: "Cloud infrastructure security and compliance career path",
      category: "Security",
      steps: [
        {
          id: "cls1",
          title: "Cloud Fundamentals",
          description: "Learn AWS, Azure, or GCP basics and cloud architecture",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "cls2",
          title: "Cloud Security Principles",
          description: "Understand shared responsibility model and cloud security frameworks",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "cls3",
          title: "Identity and Access Management",
          description: "Master IAM, RBAC, and identity federation in cloud",
          type: "skill",
          completed: false,
          estimatedTime: "2 months",
        },
        {
          id: "cls4",
          title: "Cloud Security Certification",
          description: "Get AWS Security Specialty or Azure Security Engineer certification",
          type: "certification",
          completed: false,
          estimatedTime: "3-4 months",
        },
        {
          id: "cls5",
          title: "Secure Cloud Architecture",
          description: "Design and implement secure cloud infrastructure",
          type: "project",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "cls6",
          title: "Compliance and Governance",
          description: "Learn SOC 2, GDPR, HIPAA compliance in cloud environments",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "cls7",
          title: "Cloud Security Tools",
          description: "Master cloud-native security tools and CSPM platforms",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "cls8",
          title: "Cloud Security Engineer Role",
          description: "Work as a cloud security engineer or architect",
          type: "experience",
          completed: false,
          estimatedTime: "6+ months",
        },
      ],
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      description: "Infrastructure automation and CI/CD pipeline career path",
      category: "Engineering",
      steps: [
        {
          id: "do1",
          title: "Linux and Scripting",
          description: "Master Linux administration and shell scripting",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "do2",
          title: "Version Control",
          description: "Advanced Git workflows and branching strategies",
          type: "skill",
          completed: false,
          estimatedTime: "1 month",
        },
        {
          id: "do3",
          title: "CI/CD Pipelines",
          description: "Build automated deployment pipelines with Jenkins/GitLab CI",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "do4",
          title: "Containerization",
          description: "Master Docker and container orchestration with Kubernetes",
          type: "skill",
          completed: false,
          estimatedTime: "3-4 months",
        },
        {
          id: "do5",
          title: "Infrastructure as Code",
          description: "Learn Terraform, Ansible, or CloudFormation",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "do6",
          title: "Cloud Platforms",
          description: "Get certified in AWS, Azure, or GCP",
          type: "certification",
          completed: false,
          estimatedTime: "3-4 months",
        },
        {
          id: "do7",
          title: "Monitoring and Logging",
          description: "Implement observability with Prometheus, Grafana, ELK stack",
          type: "skill",
          completed: false,
          estimatedTime: "2 months",
        },
        {
          id: "do8",
          title: "DevOps Portfolio",
          description: "Build end-to-end DevOps project with full automation",
          type: "project",
          completed: false,
          estimatedTime: "1-2 months",
        },
      ],
    },
    {
      id: "mobile-developer",
      title: "Mobile App Developer",
      description: "iOS and Android application development career path",
      category: "Development",
      steps: [
        {
          id: "md1",
          title: "Programming Fundamentals",
          description: "Learn programming basics with Java, Kotlin, or Swift",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "md2",
          title: "Mobile Development Basics",
          description: "Understand mobile app architecture and design patterns",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "md3",
          title: "Native Development",
          description: "Learn Android Studio/Kotlin or Xcode/Swift",
          type: "skill",
          completed: false,
          estimatedTime: "3-4 months",
        },
        {
          id: "md4",
          title: "First Mobile App",
          description: "Build and publish your first mobile application",
          type: "project",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "md5",
          title: "Cross-Platform Development",
          description: "Learn React Native, Flutter, or Xamarin",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "md6",
          title: "Backend Integration",
          description: "Connect apps to APIs, databases, and cloud services",
          type: "skill",
          completed: false,
          estimatedTime: "2 months",
        },
        {
          id: "md7",
          title: "App Store Optimization",
          description: "Learn app store guidelines and optimization strategies",
          type: "skill",
          completed: false,
          estimatedTime: "1 month",
        },
        {
          id: "md8",
          title: "Mobile Developer Role",
          description: "Land a mobile development position",
          type: "experience",
          completed: false,
          estimatedTime: "3-6 months",
        },
      ],
    },
    {
      id: "uiux-designer",
      title: "UI/UX Designer",
      description: "User interface and experience design career path",
      category: "Design",
      steps: [
        {
          id: "ux1",
          title: "Design Fundamentals",
          description: "Learn color theory, typography, and visual hierarchy",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "ux2",
          title: "User Research",
          description: "Master user interviews, surveys, and usability testing",
          type: "skill",
          completed: false,
          estimatedTime: "2 months",
        },
        {
          id: "ux3",
          title: "Wireframing and Prototyping",
          description: "Learn Figma, Sketch, or Adobe XD for design creation",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "ux4",
          title: "Design System Creation",
          description: "Build a comprehensive design system project",
          type: "project",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "ux5",
          title: "Interaction Design",
          description: "Learn animation, micro-interactions, and motion design",
          type: "skill",
          completed: false,
          estimatedTime: "2 months",
        },
        {
          id: "ux6",
          title: "Accessibility Design",
          description: "Understand WCAG guidelines and inclusive design principles",
          type: "skill",
          completed: false,
          estimatedTime: "1 month",
        },
        {
          id: "ux7",
          title: "Portfolio Development",
          description: "Create a professional UX portfolio with case studies",
          type: "project",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "ux8",
          title: "UX Designer Position",
          description: "Secure a UI/UX designer role",
          type: "experience",
          completed: false,
          estimatedTime: "3-6 months",
        },
      ],
    },
    {
      id: "blockchain-developer",
      title: "Blockchain Developer",
      description: "Decentralized applications and smart contracts career path",
      category: "Development",
      steps: [
        {
          id: "bc1",
          title: "Blockchain Fundamentals",
          description: "Understand blockchain technology, consensus mechanisms, and cryptography",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "bc2",
          title: "Smart Contract Development",
          description: "Learn Solidity and Ethereum development",
          type: "skill",
          completed: false,
          estimatedTime: "3-4 months",
        },
        {
          id: "bc3",
          title: "Web3 Development",
          description: "Build decentralized applications with Web3.js or Ethers.js",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "bc4",
          title: "DeFi Project",
          description: "Create a decentralized finance application",
          type: "project",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "bc5",
          title: "NFT Marketplace",
          description: "Build an NFT marketplace or minting platform",
          type: "project",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "bc6",
          title: "Blockchain Security",
          description: "Learn smart contract auditing and security best practices",
          type: "skill",
          completed: false,
          estimatedTime: "2 months",
        },
        {
          id: "bc7",
          title: "Alternative Blockchains",
          description: "Explore Polygon, Binance Smart Chain, or Solana development",
          type: "skill",
          completed: false,
          estimatedTime: "2 months",
        },
        {
          id: "bc8",
          title: "Blockchain Developer Role",
          description: "Join a Web3 company or blockchain startup",
          type: "experience",
          completed: false,
          estimatedTime: "6+ months",
        },
      ],
    },
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Full-stack development career path",
      category: "Development",
      steps: [
        {
          id: "1",
          title: "Learn Programming Fundamentals",
          description: "Master basic programming concepts with Python or JavaScript",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "2",
          title: "Web Development Basics",
          description: "HTML, CSS, and JavaScript fundamentals",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "3",
          title: "Build Your First Project",
          description: "Create a personal portfolio website",
          type: "project",
          completed: false,
          estimatedTime: "2-4 weeks",
        },
        {
          id: "4",
          title: "Learn a Frontend Framework",
          description: "Master React, Vue, or Angular",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "5",
          title: "Backend Development",
          description: "Learn Node.js, databases, and APIs",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "6",
          title: "Full-Stack Project",
          description: "Build a complete web application",
          type: "project",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "7",
          title: "Get Certified",
          description: "Obtain relevant certifications (AWS, Google Cloud, etc.)",
          type: "certification",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "8",
          title: "Internship/Entry-Level Position",
          description: "Gain real-world experience",
          type: "experience",
          completed: false,
          estimatedTime: "3-6 months",
        },
      ],
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Analytics and machine learning career path",
      category: "Data & AI",
      steps: [
        {
          id: "ds1",
          title: "Statistics and Mathematics",
          description: "Master statistical concepts and linear algebra",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "ds2",
          title: "Python for Data Science",
          description: "Learn Python, pandas, numpy, and matplotlib",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "ds3",
          title: "Data Analysis Project",
          description: "Complete an end-to-end data analysis project",
          type: "project",
          completed: false,
          estimatedTime: "1 month",
        },
        {
          id: "ds4",
          title: "Machine Learning",
          description: "Learn ML algorithms and frameworks",
          type: "skill",
          completed: false,
          estimatedTime: "3-4 months",
        },
        {
          id: "ds5",
          title: "ML Project Portfolio",
          description: "Build 3-5 machine learning projects",
          type: "project",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "ds6",
          title: "Data Science Certification",
          description: "Get certified in data science or ML",
          type: "certification",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "ds7",
          title: "Industry Experience",
          description: "Internship or junior data scientist role",
          type: "experience",
          completed: false,
          estimatedTime: "6+ months",
        },
      ],
    },
    {
      id: "product-manager",
      title: "Product Manager",
      description: "Product strategy and management career path",
      category: "Business",
      steps: [
        {
          id: "pm1",
          title: "Business Fundamentals",
          description: "Learn business strategy, market analysis, and finance basics",
          type: "skill",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "pm2",
          title: "Product Management Basics",
          description: "Understand product lifecycle, user research, and metrics",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "pm3",
          title: "Case Study Project",
          description: "Complete a product strategy case study",
          type: "project",
          completed: false,
          estimatedTime: "2-4 weeks",
        },
        {
          id: "pm4",
          title: "Technical Understanding",
          description: "Learn basic technical concepts and development processes",
          type: "skill",
          completed: false,
          estimatedTime: "1-2 months",
        },
        {
          id: "pm5",
          title: "Product Management Certification",
          description: "Get certified in product management",
          type: "certification",
          completed: false,
          estimatedTime: "1 month",
        },
        {
          id: "pm6",
          title: "Product Portfolio",
          description: "Build a portfolio of product management work",
          type: "project",
          completed: false,
          estimatedTime: "2-3 months",
        },
        {
          id: "pm7",
          title: "PM Role",
          description: "Land an associate or junior PM position",
          type: "experience",
          completed: false,
          estimatedTime: "3-6 months",
        },
      ],
    },
  ]

  const selectedRoadmap = roadmaps.find((r) => r.id === selectedCareer)

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId)
    } else {
      newCompleted.add(stepId)
    }
    setCompletedSteps(newCompleted)
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case "skill":
        return BookOpen
      case "certification":
        return Award
      case "project":
        return Target
      case "experience":
        return Briefcase
      default:
        return Circle
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Security":
        return Shield
      case "Development":
        return Cpu
      case "Design":
        return Palette
      case "Data & AI":
        return BarChart
      case "Engineering":
        return Cloud
      case "Business":
        return Database
      default:
        return Map
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "skill":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "certification":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "project":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "experience":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const calculateProgress = () => {
    if (!selectedRoadmap) return 0
    return Math.round((completedSteps.size / selectedRoadmap.steps.length) * 100)
  }

  const groupedRoadmaps = roadmaps.reduce(
    (acc, roadmap) => {
      if (!acc[roadmap.category]) {
        acc[roadmap.category] = []
      }
      acc[roadmap.category].push(roadmap)
      return acc
    },
    {} as Record<string, CareerRoadmap[]>,
  )

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Career Roadmaps</h1>
              <p className="text-muted-foreground">
                Structured paths to help you achieve your career goals across various fields
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Career Selection */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      Choose Your Path
                    </CardTitle>
                    <CardDescription>Select a career to see the roadmap</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a career" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(groupedRoadmaps).map(([category, categoryRoadmaps]) => (
                          <div key={category}>
                            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground flex items-center gap-2">
                              {React.createElement(getCategoryIcon(category), { className: "w-4 h-4" })}
                              {category}
                            </div>
                            {categoryRoadmaps.map((roadmap) => (
                              <SelectItem key={roadmap.id} value={roadmap.id} className="pl-6">
                                {roadmap.title}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedRoadmap && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Progress</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completed</span>
                            <span>
                              {completedSteps.size}/{selectedRoadmap.steps.length}
                            </span>
                          </div>
                          <Progress value={calculateProgress()} className="h-2" />
                          <p className="text-sm text-muted-foreground">{calculateProgress()}% complete</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Roadmap Steps */}
              <div className="lg:col-span-3">
                {!selectedRoadmap ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <Map className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Select a career path to see the detailed roadmap</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          We now offer {roadmaps.length} different career paths across{" "}
                          {Object.keys(groupedRoadmaps).length} categories
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {React.createElement(getCategoryIcon(selectedRoadmap.category), { className: "w-5 h-5" })}
                          <Badge variant="secondary">{selectedRoadmap.category}</Badge>
                        </div>
                        <CardTitle>{selectedRoadmap.title} Roadmap</CardTitle>
                        <CardDescription>{selectedRoadmap.description}</CardDescription>
                      </CardHeader>
                    </Card>

                    <div className="space-y-4">
                      {selectedRoadmap.steps.map((step, index) => {
                        const Icon = getStepIcon(step.type)
                        const isCompleted = completedSteps.has(step.id)

                        return (
                          <Card
                            key={step.id}
                            className={`transition-all hover:shadow-md ${isCompleted ? "bg-muted/50" : ""}`}
                          >
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                  <Button
                                    variant={isCompleted ? "default" : "outline"}
                                    size="icon"
                                    className="rounded-full hover:scale-105 transition-transform duration-200"
                                    onClick={() => toggleStepCompletion(step.id)}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      <span className="text-sm font-medium">{index + 1}</span>
                                    )}
                                  </Button>
                                  {index < selectedRoadmap.steps.length - 1 && (
                                    <div className="w-px h-16 bg-border mt-2" />
                                  )}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <h3
                                      className={`text-lg font-semibold ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                                    >
                                      {step.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      <Badge className={getTypeColor(step.type)}>
                                        <Icon className="w-3 h-3 mr-1" />
                                        {step.type}
                                      </Badge>
                                      <Badge variant="outline">{step.estimatedTime}</Badge>
                                    </div>
                                  </div>
                                  <p className={`text-muted-foreground ${isCompleted ? "line-through" : ""}`}>
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Chatbot />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
