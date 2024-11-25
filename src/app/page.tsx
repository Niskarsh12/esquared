import { SiteHeader } from "@/components/site-header"
import { SearchBar } from "@/components/search-bar"
import { PixelatedLogo } from "@/components/pixelated-logo"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center space-y-8 max-w-3xl text-center">
          <PixelatedLogo size={64} className="text-foreground" />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Discover Smarter Search
            </h1>
            <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
              Unlock intelligent search with our generative UI.
            </p>
          </div>
          <SearchBar />
        </div>
      </main>
    </div>
  )
}

