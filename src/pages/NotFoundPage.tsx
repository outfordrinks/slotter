import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">404</h2>
        <p className="mt-2 text-xl text-gray-600">Page not found</p>
        <p className="mt-1 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <Button asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
} 