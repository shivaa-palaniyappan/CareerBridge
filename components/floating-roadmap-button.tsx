"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Map } from "lucide-react"

export function FloatingRoadmapButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Link href="/roadmap">
        <Button
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
          }}
        >
          <Map className="w-5 h-5 mr-2" />
          Roadmap
        </Button>
      </Link>
    </div>
  )
}
