import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WebSocketDemo } from "@/components/websocket-demo"

export default function Home() {
  return (
    <div className="space-y-8 py-6">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text h-14 text-transparent">
          Next.js Rendering Methods
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Explore the four primary rendering techniques in Next.js with practical examples
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400 font-bold">SSR</span>
            </div>
            <CardTitle className="text-lg">Server Side Rendering</CardTitle>
            <CardDescription>Dynamic content on every request</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Server-side rendering generates the page on each request. Data is fetched on the server.
            </p>
            <Button asChild className="w-full text-sm h-8">
              <Link href="/posts">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-green-200 dark:border-green-900/30 hover:border-green-400 dark:hover:border-green-700">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400 font-bold">SSG</span>
            </div>
            <CardTitle className="text-lg">Static Site Generation</CardTitle>
            <CardDescription>Pre-rendered at build time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Static generation creates pages at build time. Data is fetched at build time.
            </p>
            <Button asChild variant="secondary" className="w-full text-sm h-8">
              <Link href="/posts/1">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-amber-200 dark:border-amber-900/30 hover:border-amber-400 dark:hover:border-amber-700">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <span className="text-amber-600 dark:text-amber-400 font-bold">ISR</span>
            </div>
            <CardTitle className="text-lg">Incremental Static Regeneration</CardTitle>
            <CardDescription>Static with revalidation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              ISR combines SSG with revalidation. Pages are regenerated on-demand after a timeout.
            </p>
            <Button asChild variant="secondary" className="w-full text-sm h-8">
              <Link href="/posts/isr">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-purple-200 dark:border-purple-900/30 hover:border-purple-400 dark:hover:border-purple-700">
          <CardHeader>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <span className="text-purple-600 dark:text-purple-400 font-bold">CSR</span>
            </div>
            <CardTitle className="text-lg">Client Side Rendering</CardTitle>
            <CardDescription>Browser-based data fetching</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Client-side rendering fetches data in the browser using useEffect or other client-side methods.
            </p>
            <Button asChild variant="secondary" className="w-full text-sm h-8">
              <Link href="/posts/csr">View Example</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Create Post Form</CardTitle>
            <CardDescription>Form with validation and file upload</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              A form with validation using react-hook-form and Zod. Includes text and file inputs.
            </p>
            <Button asChild className="w-full text-sm h-8">
              <Link href="/posts/create">View Form</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Modal Form</CardTitle>
            <CardDescription>Reusable modal component</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              A reusable modal component with form functionality. Can be opened from any page.
            </p>
            <Button asChild variant="secondary" className="w-full text-sm h-8">
              <Link href="/posts">Open Modal</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>WebSocket Demo</CardTitle>
            <CardDescription>Real-time communication simulation</CardDescription>
          </CardHeader>
          <CardContent>
            <WebSocketDemo />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}