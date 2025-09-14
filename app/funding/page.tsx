"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Plus, Users, Calendar, Target } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  category: string
  fundingGoal: number
  currentFunding: number
  backers: number
  daysLeft: number
  creator: string
  tags: string[]
}

export default function FundingPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "AI-Powered Study Assistant",
      description:
        "An intelligent study companion that helps students learn more effectively using machine learning algorithms.",
      category: "EdTech",
      fundingGoal: 50000,
      currentFunding: 32500,
      backers: 127,
      daysLeft: 23,
      creator: "Sarah Chen",
      tags: ["AI", "Education", "Mobile App"],
    },
    {
      id: "2",
      title: "Sustainable Food Delivery Platform",
      description:
        "Eco-friendly food delivery service that connects local restaurants with environmentally conscious consumers.",
      category: "GreenTech",
      fundingGoal: 75000,
      currentFunding: 18750,
      backers: 89,
      daysLeft: 45,
      creator: "Mike Rodriguez",
      tags: ["Sustainability", "Food", "Logistics"],
    },
    {
      id: "3",
      title: "Virtual Reality Therapy Tool",
      description:
        "VR application designed to help people overcome phobias and anxiety through controlled exposure therapy.",
      category: "HealthTech",
      fundingGoal: 100000,
      currentFunding: 67500,
      backers: 203,
      daysLeft: 12,
      creator: "Dr. Emily Watson",
      tags: ["VR", "Mental Health", "Therapy"],
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    fundingGoal: "",
    tags: "",
  })

  const handleSubmitProject = () => {
    if (!newProject.title || !newProject.description || !newProject.category || !newProject.fundingGoal) {
      return
    }

    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      category: newProject.category,
      fundingGoal: Number.parseInt(newProject.fundingGoal),
      currentFunding: 0,
      backers: 0,
      daysLeft: 60,
      creator: "You",
      tags: newProject.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }

    setProjects((prev) => [project, ...prev])
    setNewProject({ title: "", description: "", category: "", fundingGoal: "", tags: "" })
    setIsDialogOpen(false)
  }

  const handleFundProject = (projectId: string, amount: number) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              currentFunding: project.currentFunding + amount,
              backers: project.backers + 1,
            }
          : project,
      ),
    )
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Project Funding</h1>
                <p className="text-muted-foreground">Discover and fund innovative projects from our community</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="hover:scale-105 transition-transform duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Your Project for Funding</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        value={newProject.title}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter project title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your project"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newProject.category}
                        onValueChange={(value) => setNewProject((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                          <SelectItem value="HealthTech">HealthTech</SelectItem>
                          <SelectItem value="FinTech">FinTech</SelectItem>
                          <SelectItem value="GreenTech">GreenTech</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                          <SelectItem value="Web">Web</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="funding">Funding Goal (₹)</Label>
                      <Input
                        id="funding"
                        type="number"
                        value={newProject.fundingGoal}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, fundingGoal: e.target.value }))}
                        placeholder="4000000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={newProject.tags}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, tags: e.target.value }))}
                        placeholder="AI, Mobile, Education"
                      />
                    </div>
                    <Button onClick={handleSubmitProject} className="w-full">
                      Submit Project
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100

                return (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{project.category}</Badge>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">by {project.creator}</div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>₹{project.currentFunding.toLocaleString()}</span>
                            <span>₹{project.fundingGoal.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {fundingPercentage.toFixed(1)}% funded
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{project.backers} backers</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{project.daysLeft} days left</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 hover:scale-105 transition-transform duration-200"
                            onClick={() => handleFundProject(project.id, 8000)}
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Fund ₹8,000
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 hover:scale-105 transition-transform duration-200 bg-transparent"
                            onClick={() => handleFundProject(project.id, 40000)}
                          >
                            Fund ₹40,000
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {projects.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                  <p className="text-muted-foreground mb-4">Be the first to submit a project for funding!</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <Chatbot />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
