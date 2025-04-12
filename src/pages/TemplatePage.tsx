import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TemplatePage() {
  const { id } = useParams()

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Template Preview</h2>
        <p className="mt-2 text-gray-600">Template ID: {id}</p>
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Template Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Template content will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  )
} 