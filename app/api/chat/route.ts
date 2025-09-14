import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_API_KEY = "AIzaSyDkMlV8AjVxSb5L5-KIkPtLaaOFxxSMF_U"
const GOOGLE_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await fetch(`${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful CareerBridge assistant. CareerBridge is a comprehensive career development platform that helps students and job seekers build successful careers. 

The platform includes:
- Smart Job Prep: AI-driven job matching and skill gap analysis
- Project Marketplace: Showcase work and discover opportunities  
- Mini-Gigs: Short-term projects and freelance work
- Mentorship: Connect with industry professionals
- Real-time Chat: Network and collaborate with peers
- Project Funding: Get investment for innovative ideas
- Career Roadmaps: Personalized learning paths for different career tracks

Please provide helpful, encouraging, and specific advice related to career development, job searching, skill building, and using the CareerBridge platform. Keep responses concise but informative.

User message: ${message}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`)
    }

    const data = await response.json()
    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request."

    return NextResponse.json({ response: botResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to get response from chatbot" }, { status: 500 })
  }
}
