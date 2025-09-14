"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
  placeholder: string
  suggestions: string[]
  selectedItems: string[]
  onRemove: (item: string) => void
  label: string
}

export function AutocompleteInput({
  value,
  onChange,
  onAdd,
  placeholder,
  suggestions,
  selectedItems,
  onRemove,
  label,
}: AutocompleteInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.trim()) {
      const searchTerm = value.toLowerCase().trim()

      const exactMatches = suggestions.filter(
        (suggestion) => suggestion.toLowerCase() === searchTerm && !selectedItems.includes(suggestion),
      )

      const startsWithMatches = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().startsWith(searchTerm) &&
          !selectedItems.includes(suggestion) &&
          !exactMatches.includes(suggestion),
      )

      const containsMatches = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(searchTerm) &&
          !selectedItems.includes(suggestion) &&
          !exactMatches.includes(suggestion) &&
          !startsWithMatches.includes(suggestion),
      )

      // Prioritize exact matches and starts-with matches for better "kot" -> "kotlin" matching
      const filtered = [...exactMatches, ...startsWithMatches, ...containsMatches].slice(0, 8)
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
      setSelectedIndex(-1)
    } else {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }, [value, suggestions, selectedItems])

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    setTimeout(() => {
      if (suggestion.trim() && !selectedItems.includes(suggestion.trim())) {
        onAdd()
      }
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        handleSuggestionClick(filteredSuggestions[selectedIndex])
      } else if (filteredSuggestions.length > 0 && showSuggestions) {
        handleSuggestionClick(filteredSuggestions[0])
      } else {
        onAdd()
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    } else if (e.key === "Tab" && showSuggestions && filteredSuggestions.length > 0) {
      e.preventDefault()
      handleSuggestionClick(filteredSuggestions[0])
    }
  }

  const handleInputFocus = () => {
    if (value.trim() && filteredSuggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }, 150)
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="pr-4"
            />
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 z-50 bg-background border border-border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto"
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    className={`w-full px-3 py-2 text-left text-sm transition-all duration-150 border-b border-border/50 last:border-b-0 ${
                      index === selectedIndex
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button size="icon" onClick={onAdd} className="hover:bg-accent transition-colors duration-200">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="flex items-center gap-1 hover:bg-accent transition-colors duration-200"
          >
            {item}
            <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => onRemove(item)} />
          </Badge>
        ))}
      </div>
    </div>
  )
}
