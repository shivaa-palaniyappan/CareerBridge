"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Briefcase, Plus, Clock, DollarSign, Calendar, User, Tag, MapPin } from "lucide-react"
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"

interface Gig {
  id: string
  title: string
  description: string
  category: string
  skills: string[]
  payRange: string
  deadline: string
  duration: string
  location: string
  poster: string
  posterEmail: string
  createdAt: Date
  status: "open" | "in-progress" | "completed"
}

export default function MiniGigsPage() {
  const { user } = useAuth()
  const [gigs, setGigs] = useState<Gig[]>([])
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPayRange, setSelectedPayRange] = useState("all")

  const [newGig, setNewGig] = useState({
    title: "",
    description: "",
    category: "",
    skills: "",
    payRange: "",
    deadline: "",
    duration: "",
    location: "",
  })

  const categories = [
    "Web Development",
    "Mobile Development",
    "Design",
    "Writing & Content",
    "Marketing",
    "Data Entry",
    "Virtual Assistant",
    "Consulting",
    "Other",
  ]

  const payRanges = ["₹4,000 - ₹8,000", "₹8,000 - ₹20,000", "₹20,000 - ₹40,000", "₹40,000 - ₹80,000", "₹80,000+"]

  const durations = ["1-2 days", "3-5 days", "1 week", "2 weeks", "1 month"]

  useEffect(() => {
    // Real-time listener for gigs
    const q = query(collection(db, "gigs"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const gigsData: Gig[] = []
      querySnapshot.forEach((doc) => {
        gigsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Gig)
      })
      setGigs(gigsData)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmitGig = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      await addDoc(collection(db, "gigs"), {
        title: newGig.title,
        description: newGig.description,
        category: newGig.category,
        skills: newGig.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        payRange: newGig.payRange,
        deadline: newGig.deadline,
        duration: newGig.duration,
        location: newGig.location,
        poster: user.displayName || user.email?.split("@")[0] || "Anonymous",
        posterEmail: user.email,
        createdAt: new Date(),
        status: "open",
      })

      setNewGig({
        title: "",
        description: "",
        category: "",
        skills: "",
        payRange: "",
        deadline: "",
        duration: "",
        location: "",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error adding gig:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || gig.category === selectedCategory
    const matchesPayRange = selectedPayRange === "all" || gig.payRange === selectedPayRange

    return matchesSearch && matchesCategory && matchesPayRange && gig.status === "open"
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays > 0
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Mini-Gigs</h1>
                <p className="text-muted-foreground">
                  Find short-term projects and freelance opportunities to build your experience
                </p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Post Gig
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Post a Mini-Gig</DialogTitle>
                    <DialogDescription>Share a short-term project or task with the community</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmitGig} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Gig Title</Label>
                      <Input
                        id="title"
                        value={newGig.title}
                        onChange={(e) => setNewGig((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Build a landing page for startup"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newGig.description}
                        onChange={(e) => setNewGig((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the project, requirements, and deliverables..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newGig.category}
                          onValueChange={(value) => setNewGig((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="payRange">Pay Range</Label>
                        <Select
                          value={newGig.payRange}
                          onValueChange={(value) => setNewGig((prev) => ({ ...prev, payRange: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select pay range" />
                          </SelectTrigger>
                          <SelectContent>
                            {payRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="skills">Required Skills</Label>
                      <Input
                        id="skills"
                        value={newGig.skills}
                        onChange={(e) => setNewGig((prev) => ({ ...prev, skills: e.target.value }))}
                        placeholder="React, Design, Writing (comma-separated)"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Select
                          value={newGig.duration}
                          onValueChange={(value) => setNewGig((prev) => ({ ...prev, duration: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map((duration) => (
                              <SelectItem key={duration} value={duration}>
                                {duration}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={newGig.deadline}
                          onChange={(e) => setNewGig((prev) => ({ ...prev, deadline: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newGig.location}
                        onChange={(e) => setNewGig((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Remote, New York, or Hybrid"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Posting..." : "Post Gig"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  placeholder="Search gigs, skills, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPayRange} onValueChange={setSelectedPayRange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Pay Ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pay Ranges</SelectItem>
                  {payRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gigs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {gigs.length === 0
                      ? "No gigs available yet. Be the first to post one!"
                      : "No gigs match your search criteria."}
                  </p>
                </div>
              ) : (
                filteredGigs.map((gig) => (
                  <Card key={gig.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2">
                          <Badge variant="secondary">{gig.category}</Badge>
                          <Badge className={getStatusColor(gig.status)}>{gig.status}</Badge>
                          {isDeadlineSoon(gig.deadline) && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{gig.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        by {gig.poster}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{gig.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-green-600">{gig.payRange}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {gig.duration}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(gig.deadline).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {gig.location}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Skills:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {gig.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full mt-4">Apply for Gig</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <Chatbot />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
