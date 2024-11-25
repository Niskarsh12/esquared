"use client"

import { useState, useRef, useEffect } from "react"
import { Gauge, Mic, Search, TrendingUp } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GameOfLife } from "@/components/game-of-life"

const trendingSearches = [
  "AI in healthcare",
  "Sustainable energy solutions",
  "Quantum computing advancements",
  "Remote work best practices",
  "Blockchain applications",
  "Machine learning algorithms",
  "Cybersecurity trends",
  "Internet of Things (IoT)",
  "Virtual reality in education",
  "5G technology impact"
]

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isAnimationActive, setIsAnimationActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const handleMicClick = () => {
    setIsAnimationActive(true)
    setTimeout(() => setIsAnimationActive(false), 5000)
  }

  const filteredSearches = trendingSearches.filter(search => 
    search.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex items-center space-x-2 bg-muted/50 rounded-md px-3 py-1">
          <Gauge className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="normal">
            <SelectTrigger className="border-0 bg-transparent p-0 h-auto w-[80px] text-sm focus:ring-0">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative w-full">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full pl-10 pr-10 py-6 text-lg bg-muted/50"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleMicClick}
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
        {isFocused && (
          <div 
            ref={suggestionsRef}
            className="absolute left-0 right-0 mt-0 bg-background/95 backdrop-blur-sm border-t border-border"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <TrendingUp className="w-4 h-4" />
                Trending Searches
              </div>
              <ul className="space-y-3">
                {filteredSearches.map((search, index) => (
                  <li 
                    key={index} 
                    className="cursor-pointer text-foreground/90 hover:text-primary transition-colors"
                    onClick={() => {
                      setQuery(search)
                      setIsFocused(false)
                      inputRef.current?.focus()
                    }}
                  >
                    {search}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <GameOfLife isActive={isAnimationActive} />
    </div>
  )
}

