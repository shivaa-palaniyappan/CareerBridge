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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Mail, Search, Phone, Video, MoreVertical, UserPlus } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen: string
  role: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: "text" | "email" | "system"
}

interface Conversation {
  id: string
  participants: Contact[]
  messages: Message[]
  lastMessage: Message
  unreadCount: number
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      status: "online",
      lastSeen: "now",
      role: "Senior Developer",
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      email: "mike.rodriguez@example.com",
      status: "away",
      lastSeen: "5 minutes ago",
      role: "Product Manager",
    },
    {
      id: "3",
      name: "Dr. Emily Watson",
      email: "emily.watson@example.com",
      status: "offline",
      lastSeen: "2 hours ago",
      role: "Mentor",
    },
  ])

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participants: [contacts[0]],
      messages: [
        {
          id: "1",
          senderId: "1",
          content: "Hey! I saw your project on the funding platform. Really impressive work!",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: "text",
        },
        {
          id: "2",
          senderId: "current",
          content: "Thank you! I'd love to collaborate if you're interested.",
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          type: "text",
        },
      ],
      lastMessage: {
        id: "2",
        senderId: "current",
        content: "Thank you! I'd love to collaborate if you're interested.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        type: "text",
      },
      unreadCount: 0,
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteMessage, setInviteMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message,
            }
          : conv,
      ),
    )

    setNewMessage("")
  }

  const handleInviteUser = () => {
    if (!inviteEmail.trim()) return

    // Simulate sending invitation
    const systemMessage: Message = {
      id: Date.now().toString(),
      senderId: "system",
      content: `Invitation sent to ${inviteEmail}${inviteMessage ? `: "${inviteMessage}"` : ""}`,
      timestamp: new Date(),
      type: "system",
    }

    // Add to general conversation or create new one
    if (conversations.length > 0) {
      setConversations((prev) =>
        prev.map((conv, index) =>
          index === 0
            ? {
                ...conv,
                messages: [...conv.messages, systemMessage],
                lastMessage: systemMessage,
              }
            : conv,
        ),
      )
    }

    setInviteEmail("")
    setInviteMessage("")
    setIsInviteDialogOpen(false)
  }

  const currentConversation = conversations.find((conv) => conv.id === selectedConversation)
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
                <p className="text-muted-foreground">Connect and collaborate with your network</p>
              </div>

              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="hover:scale-105 transition-transform duration-200">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite People
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Invite Someone to Connect</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="colleague@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={inviteMessage}
                        onChange={(e) => setInviteMessage(e.target.value)}
                        placeholder="Hi! I'd like to connect with you on CareerBridge..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleInviteUser} className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Invitation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
              {/* Contacts Sidebar */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Contacts</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-1 p-4">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => {
                            // Create or find conversation with this contact
                            const existingConv = conversations.find((conv) =>
                              conv.participants.some((p) => p.id === contact.id),
                            )
                            if (existingConv) {
                              setSelectedConversation(existingConv.id)
                            }
                          }}
                        >
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                                contact.status === "online"
                                  ? "bg-green-500"
                                  : contact.status === "away"
                                    ? "bg-yellow-500"
                                    : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{contact.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{contact.role}</div>
                            <div className="text-xs text-muted-foreground">{contact.lastSeen}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-3">
                {currentConversation ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {currentConversation.participants[0]?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("") || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {currentConversation.participants[0]?.name || "Unknown User"}
                            </CardTitle>
                            <CardDescription>{currentConversation.participants[0]?.role || "User"}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <ScrollArea className="h-[400px] p-4">
                        <div className="space-y-4">
                          {currentConversation.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.senderId === "current" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.senderId === "current"
                                    ? "bg-primary text-primary-foreground"
                                    : message.type === "system"
                                      ? "bg-muted text-muted-foreground text-center italic"
                                      : "bg-muted text-muted-foreground"
                                }`}
                              >
                                <div className="text-sm">{message.content}</div>
                                <div className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">Choose a contact to start messaging</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>

          <Chatbot />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
