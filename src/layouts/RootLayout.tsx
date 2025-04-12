import { Link, Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">Slotter</Link>
          <nav className="flex gap-4">
            <Link to="/editor" className="text-gray-600 hover:text-gray-900">Editor</Link>
            <Link to="/template/demo" className="text-gray-600 hover:text-gray-900">Templates</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
} 