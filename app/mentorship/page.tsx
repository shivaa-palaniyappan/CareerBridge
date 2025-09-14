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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Star, Calendar, MessageCircle, Video, Plus } from "lucide-react"
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  bio: string
  experience: string
  rating: number
  totalSessions: number
  availability: "available" | "busy" | "unavailable"
  hourlyRate: string
  languages: string[]
  timezone: string
  email: string
  createdAt: Date
}

interface MentorshipRequest {
  id: string
  mentorId: string
  mentorName: string
  studentId: string
  studentName: string
  sessionType: "chat" | "video"
  topic: string
  message: string
  preferredDate: string
  preferredTime: string
  status: "pending" | "approved" | "completed" | "cancelled"
  createdAt: Date
}

export default function MentorshipPage() {
  const { user } = useAuth()
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [requests, setRequests] = useState<MentorshipRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [isMentorDialogOpen, setIsMentorDialogOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState("all")

  const [mentorshipRequest, setMentorshipRequest] = useState({
    sessionType: "chat" as "chat" | "video",
    topic: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  })

  const [newMentor, setNewMentor] = useState({
    name: "",
    title: "",
    company: "",
    expertise: "",
    bio: "",
    experience: "",
    hourlyRate: "",
    languages: "",
    timezone: "",
  })

  const expertiseAreas = [
    "Software Engineering",
    "Product Management",
    "Data Science",
    "Design",
    "Marketing",
    "Sales",
    "Entrepreneurship",
    "Finance",
    "Consulting",
    "Other",
  ]

  // Mock mentor data for demonstration
  const mockMentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      expertise: ["Software Engineering", "Career Development"],
      bio: "10+ years in tech, passionate about helping junior developers grow their careers.",
      experience: "10+ years",
      rating: 4.9,
      totalSessions: 127,
      availability: "available",
      hourlyRate: "₹6,400/hour",
      languages: ["English", "Mandarin"],
      timezone: "PST",
      email: "sarah.chen@example.com",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Marcus Johnson",
      title: "Product Manager",
      company: "Microsoft",
      expertise: ["Product Management", "Strategy"],
      bio: "Leading product teams for 8 years, specializing in B2B SaaS products.",
      experience: "8+ years",
      rating: 4.8,
      totalSessions: 89,
      availability: "available",
      hourlyRate: "₹7,200/hour",
      languages: ["English"],
      timezone: "EST",
      email: "marcus.johnson@example.com",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      title: "UX Design Lead",
      company: "Airbnb",
      expertise: ["Design", "User Research"],
      bio: "Design leader with expertise in user-centered design and design systems.",
      experience: "7+ years",
      rating: 4.9,
      totalSessions: 156,
      availability: "busy",
      hourlyRate: "₹6,000/hour",
      languages: ["English", "Spanish"],
      timezone: "PST",
      email: "elena.rodriguez@example.com",
      createdAt: new Date(),
    },
  ]

  useEffect(() => {
    // Initialize with mock data
    setMentors(mockMentors)

    // Real-time listener for mentorship requests
    if (user) {
      const q = query(collection(db, "mentorshipRequests"), orderBy("createdAt", "desc"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const requestsData: MentorshipRequest[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.studentId === user.uid) {
            requestsData.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
            } as MentorshipRequest)
          }
        })
        setRequests(requestsData)
      })

      return () => unsubscribe()
    }
  }, [user])

  const handleRequestMentorship = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !selectedMentor) return

    setLoading(true)
    try {
      await addDoc(collection(db, "mentorshipRequests"), {
        mentorId: selectedMentor.id,
        mentorName: selectedMentor.name,
        studentId: user.uid,
        studentName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        sessionType: mentorshipRequest.sessionType,
        topic: mentorshipRequest.topic,
        message: mentorshipRequest.message,
        preferredDate: mentorshipRequest.preferredDate,
        preferredTime: mentorshipRequest.preferredTime,
        status: "pending",
        createdAt: new Date(),
      })

      setMentorshipRequest({
        sessionType: "chat",
        topic: "",
        message: "",
        preferredDate: "",
        preferredTime: "",
      })
      setIsRequestDialogOpen(false)
      setSelectedMentor(null)
    } catch (error) {
      console.error("Error requesting mentorship:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBecomeMentor = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      await addDoc(collection(db, "mentors"), {
        name: newMentor.name,
        title: newMentor.title,
        company: newMentor.company,
        expertise: newMentor.expertise
          .split(",")
          .map((exp) => exp.trim())
          .filter(Boolean),
        bio: newMentor.bio,
        experience: newMentor.experience,
        rating: 5.0,
        totalSessions: 0,
        availability: "available",
        hourlyRate: newMentor.hourlyRate,
        languages: newMentor.languages
          .split(",")
          .map((lang) => lang.trim())
          .filter(Boolean),
        timezone: newMentor.timezone,
        email: user.email,
        createdAt: new Date(),
      })

      setNewMentor({
        name: "",
        title: "",
        company: "",
        expertise: "",
        bio: "",
        experience: "",
        hourlyRate: "",
        languages: "",
        timezone: "",
      })
      setIsMentorDialogOpen(false)
    } catch (error) {
      console.error("Error becoming mentor:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesExpertise = selectedExpertise === "all" || mentor.expertise.includes(selectedExpertise)

    return matchesSearch && matchesExpertise
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Mentorship</h1>
                <p className="text-muted-foreground">
                  Connect with industry professionals and accelerate your career growth
                </p>
              </div>

              <Dialog open={isMentorDialogOpen} onOpenChange={setIsMentorDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Plus className="w-4 h-4" />
                    Become a Mentor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Become a Mentor</DialogTitle>
                    <DialogDescription>Share your expertise and help others grow their careers</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleBecomeMentor} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newMentor.name}
                          onChange={(e) => setNewMentor((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          value={newMentor.title}
                          onChange={(e) => setNewMentor((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Senior Software Engineer"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={newMentor.company}
                        onChange={(e) => setNewMentor((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder="Google, Microsoft, etc."
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="expertise">Areas of Expertise</Label>
                      <Input
                        id="expertise"
                        value={newMentor.expertise}
                        onChange={(e) => setNewMentor((prev) => ({ ...prev, expertise: e.target.value }))}
                        placeholder="Software Engineering, Product Management (comma-separated)"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={newMentor.bio}
                        onChange={(e) => setNewMentor((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell potential mentees about your background and what you can help with..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="experience">Experience</Label>
                        <Input
                          id="experience"
                          value={newMentor.experience}
                          onChange={(e) => setNewMentor((prev) => ({ ...prev, experience: e.target.value }))}
                          placeholder="5+ years"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">Hourly Rate</Label>
                        <Input
                          id="hourlyRate"
                          value={newMentor.hourlyRate}
                          onChange={(e) => setNewMentor((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                          placeholder="₹4,000/hour"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input
                          id="timezone"
                          value={newMentor.timezone}
                          onChange={(e) => setNewMentor((prev) => ({ ...prev, timezone: e.target.value }))}
                          placeholder="PST, EST, etc."
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="languages">Languages</Label>
                      <Input
                        id="languages"
                        value={newMentor.languages}
                        onChange={(e) => setNewMentor((prev) => ({ ...prev, languages: e.target.value }))}
                        placeholder="English, Spanish (comma-separated)"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsMentorDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Apply to be Mentor"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* My Requests Section */}
            {requests.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">My Mentorship Requests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{request.mentorName}</CardTitle>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </div>
                        <CardDescription>{request.topic}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            {request.sessionType === "video" ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MessageCircle className="w-4 h-4" />
                            )}
                            <span className="capitalize">{request.sessionType} Session</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(request.preferredDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  placeholder="Search mentors by name, title, company, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="All Expertise Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise Areas</SelectItem>
                  {expertiseAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No mentors match your search criteria.</p>
                </div>
              ) : (
                filteredMentors.map((mentor) => (
                  <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                            {mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <CardTitle className="text-xl">{mentor.name}</CardTitle>
                              <CardDescription>{mentor.title}</CardDescription>
                              <p className="text-sm text-muted-foreground">{mentor.company}</p>
                            </div>
                            <Badge className={getAvailabilityColor(mentor.availability)}>{mentor.availability}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{mentor.rating}</span>
                          </div>
                          <div className="text-muted-foreground">{mentor.totalSessions} sessions</div>
                          <div className="text-muted-foreground">{mentor.experience}</div>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {mentor.expertise.map((exp) => (
                              <Badge key={exp} variant="secondary" className="text-xs">
                                {exp}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-accent">{mentor.hourlyRate}</span>
                          <div className="text-sm text-muted-foreground">
                            {mentor.timezone} • {mentor.languages.join(", ")}
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          disabled={mentor.availability === "unavailable"}
                          onClick={() => {
                            setSelectedMentor(mentor)
                            setIsRequestDialogOpen(true)
                          }}
                        >
                          {mentor.availability === "unavailable" ? "Unavailable" : "Book Session"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Request Mentorship Dialog */}
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Request Mentorship Session</DialogTitle>
                  <DialogDescription>Book a session with {selectedMentor?.name}</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleRequestMentorship} className="space-y-4">
                  <div>
                    <Label htmlFor="sessionType">Session Type</Label>
                    <Select
                      value={mentorshipRequest.sessionType}
                      onValueChange={(value: "chat" | "video") =>
                        setMentorshipRequest((prev) => ({ ...prev, sessionType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chat">Chat Session</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="topic">Session Topic</Label>
                    <Input
                      id="topic"
                      value={mentorshipRequest.topic}
                      onChange={(e) => setMentorshipRequest((prev) => ({ ...prev, topic: e.target.value }))}
                      placeholder="Career advice, technical guidance, etc."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={mentorshipRequest.message}
                      onChange={(e) => setMentorshipRequest((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell the mentor what you'd like to discuss and any specific questions you have..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={mentorshipRequest.preferredDate}
                        onChange={(e) => setMentorshipRequest((prev) => ({ ...prev, preferredDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        value={mentorshipRequest.preferredTime}
                        onChange={(e) => setMentorshipRequest((prev) => ({ ...prev, preferredTime: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Sending Request..." : "Send Request"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Chatbot />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
