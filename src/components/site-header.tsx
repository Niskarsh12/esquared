'use client'

import Link from "next/link"
import { Bell, Menu, Moon, Sun } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { PixelatedLogo } from "@/components/pixelated-logo"
import { useTheme } from "next-themes"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between w-full px-6">
        <Link href="/" className="flex items-center space-x-2">
          <PixelatedLogo size={32} />
        </Link>
        <nav className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </header>
  )
}

