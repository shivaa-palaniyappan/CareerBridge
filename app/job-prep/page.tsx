"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { AutocompleteInput } from "@/components/autocomplete-input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Target, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { FloatingRoadmapButton } from "@/components/floating-roadmap-button"

const skillSuggestions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Dart",
  "Flutter",
  "React Native",
  "HTML",
  "CSS",
  "SASS",
  "SCSS",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "Chakra UI",
  "Next.js",
  "Nuxt.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "Ruby on Rails",
  "ASP.NET",
  "GraphQL",
  "REST API",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Redis",
  "Firebase",
  "Supabase",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub",
  "GitLab",
  "Jenkins",
  "CI/CD",
  "Testing",
  "Jest",
  "Cypress",
  "Selenium",
  "Figma",
  "Adobe XD",
  "Sketch",
  "Photoshop",
  "Illustrator",
  "UI/UX Design",
  "User Research",
  "Prototyping",
  "Wireframing",
  "Agile",
  "Scrum",
  "Project Management",
  "Data Analysis",
  "Machine Learning",
  "AI",
  "TensorFlow",
  "PyTorch",
  "Pandas",
  "NumPy",
  "R",
  "Tableau",
  "Power BI",
  "Excel",
  "SQL",
  "NoSQL",
  "DevOps",
  "Linux",
  "Bash",
  "PowerShell",
]

const companySuggestions = [
  "Google",
  "Microsoft",
  "Apple",
  "Amazon",
  "Meta",
  "Netflix",
  "Tesla",
  "Spotify",
  "Uber",
  "Airbnb",
  "Twitter",
  "LinkedIn",
  "Salesforce",
  "Adobe",
  "Oracle",
  "IBM",
  "Intel",
  "NVIDIA",
  "AMD",
  "Cisco",
  "VMware",
  "Dropbox",
  "Slack",
  "Zoom",
  "Shopify",
  "Square",
  "PayPal",
  "Stripe",
  "Coinbase",
  "GitHub",
  "GitLab",
  "Atlassian",
  "Twilio",
  "MongoDB",
  "Redis",
  "Elastic",
  "Docker",
  "Kubernetes",
  "HashiCorp",
  "Databricks",
  "Snowflake",
  "Palantir",
  "Unity",
  "Epic Games",
  "Riot Games",
  "Blizzard",
  "EA Games",
  "Ubisoft",
  "Nintendo",
  "Sony",
  "Samsung",
  "LG",
  "Huawei",
  "Xiaomi",
  "OnePlus",
  "Oppo",
  "Vivo",
]

const interestSuggestions = [
  "Web Development",
  "Mobile Development",
  "Backend Development",
  "Frontend Development",
  "Full Stack Development",
  "DevOps",
  "Cloud Computing",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Science",
  "Data Analysis",
  "Cybersecurity",
  "Game Development",
  "UI/UX Design",
  "Product Management",
  "Project Management",
  "Software Architecture",
  "Database Design",
  "API Development",
  "Microservices",
  "Blockchain",
  "IoT",
  "AR/VR",
  "Computer Vision",
  "Natural Language Processing",
  "Robotics",
  "Embedded Systems",
  "Quality Assurance",
  "Technical Writing",
  "Developer Relations",
  "Sales Engineering",
  "Consulting",
]

interface JobMatch {
  id: string
  title: string
  company: string
  matchPercentage: number
  requiredSkills: string[]
  missingSkills: string[]
  description: string
  salary: string
}

interface UserProfile {
  skills: string[]
  education: string
  experience: string
  interests: string[]
  targetCompanies: string[]
}

export default function JobPrepPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>({
    skills: [],
    education: "",
    experience: "",
    interests: [],
    targetCompanies: [],
  })
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newCompany, setNewCompany] = useState("")

  const mockJobs: JobMatch[] = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp",
      matchPercentage: 85,
      requiredSkills: ["React", "TypeScript", "CSS", "JavaScript", "Git"],
      missingSkills: ["Next.js", "GraphQL"],
      description: "Build modern web applications using React and TypeScript",
      salary: "₹5,60,000 - ₹7,20,000",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      matchPercentage: 72,
      requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript", "Express"],
      missingSkills: ["Docker", "AWS", "Redis"],
      description: "Develop end-to-end web solutions for our growing platform",
      salary: "₹6,40,000 - ₹8,000,000",
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "DesignStudio",
      matchPercentage: 60,
      requiredSkills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      missingSkills: ["Sketch", "Adobe Illustrator", "User Testing"],
      description: "Create beautiful and intuitive user experiences",
      salary: "₹5,20,000 - ₹6,80,000",
    },
  ]

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const addCompany = () => {
    if (newCompany.trim() && !profile.targetCompanies.includes(newCompany.trim())) {
      setProfile((prev) => ({
        ...prev,
        targetCompanies: [...prev.targetCompanies, newCompany.trim()],
      }))
      setNewCompany("")
    }
  }

  const removeCompany = (company: string) => {
    setProfile((prev) => ({
      ...prev,
      targetCompanies: prev.targetCompanies.filter((c) => c !== company),
    }))
  }

  const analyzeJobMatches = async () => {
    setLoading(true)

    // Save profile to Firebase
    try {
      if (user) {
        await addDoc(collection(db, "userProfiles"), {
          userId: user.uid,
          ...profile,
          updatedAt: new Date(),
        })
      }
    } catch (error) {
      console.error("Error saving profile:", error)
    }

    // Simulate AI analysis
    setTimeout(() => {
      const matches = mockJobs
        .map((job) => {
          const userSkillsSet = new Set(profile.skills.map((s) => s.toLowerCase()))
          const requiredSkillsSet = new Set(job.requiredSkills.map((s) => s.toLowerCase()))

          const matchingSkills = [...userSkillsSet].filter((skill) =>
            [...requiredSkillsSet].some((reqSkill) => reqSkill.includes(skill) || skill.includes(reqSkill)),
          )

          const matchPercentage = Math.round((matchingSkills.length / job.requiredSkills.length) * 100)

          return {
            ...job,
            matchPercentage: Math.min(matchPercentage, 95),
          }
        })
        .sort((a, b) => b.matchPercentage - a.matchPercentage)

      setJobMatches(matches)
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    window.addEventListener("error", handleResizeObserverError)
    return () => window.removeEventListener("error", handleResizeObserverError)
  }, [])

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Smart Job Prep</h1>
              <p className="text-muted-foreground">
                AI-powered job matching and skill gap analysis to accelerate your career
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Setup */}
              <div className="lg:col-span-1">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-500" />
                      Your Profile
                    </CardTitle>
                    <CardDescription>Tell us about your skills and interests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Skills with Autocomplete */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Skills</Label>
                      <AutocompleteInput
                        value={newSkill}
                        onChange={setNewSkill}
                        onAdd={addSkill}
                        placeholder="Type a skill (e.g., kot...)"
                        suggestions={skillSuggestions}
                        selectedItems={profile.skills}
                        onRemove={removeSkill}
                        label="Skills"
                      />
                    </div>

                    {/* Target Companies with Autocomplete */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Target Companies</Label>
                      <AutocompleteInput
                        value={newCompany}
                        onChange={setNewCompany}
                        onAdd={addCompany}
                        placeholder="Type a company name"
                        suggestions={companySuggestions}
                        selectedItems={profile.targetCompanies}
                        onRemove={removeCompany}
                        label="Companies"
                      />
                    </div>

                    {/* Education */}
                    <div>
                      <Label htmlFor="education">Education Level</Label>
                      <Select
                        value={profile.education}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, education: value }))}
                      >
                        <SelectTrigger className="hover:bg-accent transition-colors duration-200">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="associate">Associate Degree</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Experience */}
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Textarea
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => setProfile((prev) => ({ ...prev, experience: e.target.value }))}
                        placeholder="Describe your work experience..."
                        rows={3}
                        className="hover:bg-accent/10 transition-colors duration-200"
                      />
                    </div>

                    {/* Career Interests with Autocomplete */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Career Interests</Label>
                      <AutocompleteInput
                        value={newInterest}
                        onChange={setNewInterest}
                        onAdd={addInterest}
                        placeholder="Type an interest"
                        suggestions={interestSuggestions}
                        selectedItems={profile.interests}
                        onRemove={removeInterest}
                        label="Interests"
                      />
                    </div>

                    <Button
                      onClick={analyzeJobMatches}
                      className="w-full hover:bg-primary/90 transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      disabled={loading || profile.skills.length === 0}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Find Job Matches"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Job Matches */}
              <div className="lg:col-span-2">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      Job Matches
                    </CardTitle>
                    <CardDescription>AI-powered job recommendations based on your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {jobMatches.length === 0 ? (
                      <div className="text-center py-12">
                        <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Complete your profile and click "Find Job Matches" to see personalized recommendations
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {jobMatches.map((job) => (
                          <Card
                            key={job.id}
                            className="border-l-4 border-l-accent hover:shadow-md hover:bg-accent/5 transition-all duration-300"
                          >
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold">{job.title}</h3>
                                  <p className="text-muted-foreground">{job.company}</p>
                                  <p className="text-sm text-accent font-medium">{job.salary}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-accent">{job.matchPercentage}%</div>
                                  <p className="text-sm text-muted-foreground">Match</p>
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Skills You Have
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {job.requiredSkills
                                      .filter((skill) =>
                                        profile.skills.some(
                                          (userSkill) =>
                                            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                                            skill.toLowerCase().includes(userSkill.toLowerCase()),
                                        ),
                                      )
                                      .map((skill) => (
                                        <Badge
                                          key={skill}
                                          variant="default"
                                          className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                  </div>
                                </div>

                                {job.missingSkills.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-2 flex items-center gap-2">
                                      <AlertCircle className="w-4 h-4 text-orange-500" />
                                      Skills to Develop
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {job.missingSkills.map((skill) => (
                                        <Badge
                                          key={skill}
                                          variant="outline"
                                          className="border-orange-300 text-orange-700 hover:bg-orange-50 transition-colors duration-200"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="pt-2">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Match Score</span>
                                    <span>{job.matchPercentage}%</span>
                                  </div>
                                  <Progress value={job.matchPercentage} className="h-2" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <FloatingRoadmapButton />
          <Chatbot />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
