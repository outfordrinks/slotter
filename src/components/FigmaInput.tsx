import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFigmaStore } from "@/store"

export function FigmaInput() {
  const { fileKey, setFileKey, reset } = useFigmaStore()

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Figma File Input</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Figma file URL"
          className="w-full px-3 py-2 border rounded-md"
          value={fileKey || ''}
          onChange={(e) => setFileKey(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
          <Button>
            Load File
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}