"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { SplashScreen } from "@/components/splash-screen"
import { FloatingRoadmapButton } from "@/components/floating-roadmap-button"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import {
  Brain,
  Store,
  Briefcase,
  Users,
  MessageCircle,
  DollarSign,
  ArrowRight,
  Target,
  Zap,
  Shield,
} from "lucide-react"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setShowSplash(false)
    }
  }, [user])

  const features = [
    {
      icon: Brain,
      title: "Smart Job Prep",
      description: "AI-driven job matching and skill gap analysis",
      href: "/job-prep",
      color: "text-blue-500",
    },
    {
      icon: Store,
      title: "Project Marketplace",
      description: "Showcase your work and discover opportunities",
      href: "/marketplace",
      color: "text-green-500",
    },
    {
      icon: Briefcase,
      title: "Mini-Gigs",
      description: "Find short-term projects and freelance work",
      href: "/mini-gigs",
      color: "text-purple-500",
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Connect with industry professionals",
      href: "/mentorship",
      color: "text-orange-500",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Network and collaborate with peers",
      href: "/messages",
      color: "text-cyan-500",
    },
    {
      icon: DollarSign,
      title: "Project Funding",
      description: "Get investment for your innovative ideas",
      href: "/funding",
      color: "text-emerald-500",
    },
  ]

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/images/careerbridge-logo-new.png"
            alt="CareerBridge Logo"
            width={200}
            height={200}
            className="w-32 h-32 mx-auto mb-6"
            priority
          />
          <h1 className="text-2xl font-bold text-foreground mb-4">Welcome to CareerBridge</h1>
          <p className="text-muted-foreground mb-6">Please sign in to continue</p>
          <Link href="/login">
            <Button size="lg" className="hover:scale-105 transition-transform duration-200">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/careerbridge-logo-new.png"
              alt="CareerBridge Logo"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Bridge Your Skills to the Future
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            CareerBridge is your comprehensive platform for career development. From AI-powered job matching to
            mentorship and project funding, we help students and job seekers build successful careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/job-prep">
              <Button
                size="lg"
                className="w-full sm:w-auto hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Explore Opportunities
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything You Need for Career Success</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our integrated platform provides all the tools and connections you need to advance your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.href} href={feature.href}>
                  <Card className="h-full hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors duration-200">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Targeted Matching</h3>
              <p className="text-muted-foreground">
                AI-powered algorithms match your skills with the right opportunities
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">Stay connected with instant notifications and live chat features</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">
                Your data and connections are protected with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </section>

      <FloatingRoadmapButton />
      <Chatbot />
    </div>
  )
}
