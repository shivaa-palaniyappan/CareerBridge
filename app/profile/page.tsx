"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AutocompleteInput } from "@/components/autocomplete-input"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Camera,
  Edit,
  Save,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Linkedin,
  Globe,
  Mail,
  Phone,
} from "lucide-react"

const skillSuggestions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "Agile",
  "Scrum",
  "Machine Learning",
  "Data Science",
  "UI/UX Design",
  "Project Management",
  "DevOps",
  "Cybersecurity",
  "Mobile Development",
  "Flutter",
  "React Native",
  "Vue.js",
  "Angular",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "GraphQL",
  "REST APIs",
  "Microservices",
  "Cloud Computing",
  "Artificial Intelligence",
  "Blockchain",
]

const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Gaming",
  "Media",
  "Consulting",
  "Manufacturing",
  "Retail",
  "Non-profit",
  "Government",
  "Startup",
  "Enterprise",
  "Other",
]

export default function ProfilePage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "Passionate software developer with 3+ years of experience building web applications. I love creating user-friendly interfaces and solving complex problems with clean, efficient code.",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    avatar: "/professional-headshot.png",
    experienceLevel: "Intermediate",
    industry: "Technology",
    yearsOfExperience: "3-5 years",
    education: "Bachelor's in Computer Science",
    currentRole: "Software Engineer at TechCorp",
  })

  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "AWS",
    "MongoDB",
    "Git",
  ])
  const [newSkill, setNewSkill] = useState("")

  const [achievements, setAchievements] = useState([
    "AWS Certified Developer",
    "React Certification",
    "Hackathon Winner 2023",
    "Open Source Contributor",
  ])
  const [newAchievement, setNewAchievement] = useState("")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handleAddAchievement = () => {
    if (newAchievement.trim() && !achievements.includes(newAchievement.trim())) {
      setAchievements((prev) => [...prev, newAchievement.trim()])
      setNewAchievement("")
    }
  }

  const handleRemoveAchievement = (achievement: string) => {
    setAchievements((prev) => prev.filter((a) => a !== achievement))
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
                <p className="text-muted-foreground">Manage your professional profile and showcase your skills</p>
              </div>

              <Button
                onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                className="hover:scale-105 transition-transform duration-200"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="w-32 h-32">
                          <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                          <AvatarFallback className="text-2xl">
                            {profileData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="icon"
                            className="absolute -bottom-2 -right-2 rounded-full"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                          ) : (
                            <p className="text-lg font-semibold">{profileData.name}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="title">Professional Title</Label>
                          {isEditing ? (
                            <Input
                              id="title"
                              value={profileData.title}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, title: e.target.value }))}
                            />
                          ) : (
                            <p className="text-muted-foreground">{profileData.title}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        {isEditing ? (
                          <Textarea
                            id="bio"
                            value={profileData.bio}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                            rows={3}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          {isEditing ? (
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                            />
                          ) : (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{profileData.location}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="experience">Experience Level</Label>
                          {isEditing ? (
                            <Select
                              value={profileData.experienceLevel}
                              onValueChange={(value) => setProfileData((prev) => ({ ...prev, experienceLevel: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {experienceLevels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant="secondary">{profileData.experienceLevel}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{profileData.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{profileData.phone}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      {isEditing ? (
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <a
                            href={profileData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {profileData.website}
                          </a>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      {isEditing ? (
                        <Input
                          id="linkedin"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, linkedin: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4" />
                          <a
                            href={profileData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Skills & Technologies
                  </CardTitle>
                  <CardDescription>Add your technical skills and expertise</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <AutocompleteInput
                      value={newSkill}
                      onChange={setNewSkill}
                      onAdd={handleAddSkill}
                      placeholder="Add a skill..."
                      suggestions={skillSuggestions}
                      selectedItems={skills}
                      onRemove={handleRemoveSkill}
                      label="Skills"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="hover:bg-accent transition-colors duration-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Professional Background */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Professional Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentRole">Current Role</Label>
                      {isEditing ? (
                        <Input
                          id="currentRole"
                          value={profileData.currentRole}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, currentRole: e.target.value }))}
                        />
                      ) : (
                        <p>{profileData.currentRole}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      {isEditing ? (
                        <Select
                          value={profileData.industry}
                          onValueChange={(value) => setProfileData((prev) => ({ ...prev, industry: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p>{profileData.industry}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="education">Education</Label>
                      {isEditing ? (
                        <Input
                          id="education"
                          value={profileData.education}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, education: e.target.value }))}
                        />
                      ) : (
                        <p>{profileData.education}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      {isEditing ? (
                        <Select
                          value={profileData.yearsOfExperience}
                          onValueChange={(value) => setProfileData((prev) => ({ ...prev, yearsOfExperience: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1 years">0-1 years</SelectItem>
                            <SelectItem value="1-3 years">1-3 years</SelectItem>
                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                            <SelectItem value="5-10 years">5-10 years</SelectItem>
                            <SelectItem value="10+ years">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p>{profileData.yearsOfExperience}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Achievements & Certifications
                  </CardTitle>
                  <CardDescription>Showcase your accomplishments and certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          placeholder="Add an achievement..."
                          onKeyPress={(e) => e.key === "Enter" && handleAddAchievement()}
                        />
                        <Button onClick={handleAddAchievement}>Add</Button>
                      </div>
                      <div className="space-y-2">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span>{achievement}</span>
                            <Button size="sm" variant="ghost" onClick={() => handleRemoveAchievement(achievement)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <Chatbot />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
