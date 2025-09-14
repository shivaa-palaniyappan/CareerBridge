"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showLogo, setShowLogo] = useState(true)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowText(true)
    }, 1000)

    const completeTimer = setTimeout(() => {
      setShowLogo(false)
      setShowText(false)
      setTimeout(onComplete, 500)
    }, 3000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {(showLogo || showText) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <Image
              src="/images/careerbridge-logo-new.png"
              alt="CareerBridge Logo"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 mb-6"
              priority
            />

            <AnimatePresence>
              {showText && (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-foreground text-center"
                >
                  CareerBridge
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
