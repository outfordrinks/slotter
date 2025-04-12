import { Link, Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">Slotter</Link>
          <nav className="flex gap-4">
            <Link to="/editor" className="text-muted-foreground hover:text-foreground">Editor</Link>
            <Link to="/template/demo" className="text-muted-foreground hover:text-foreground">Templates</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
} 