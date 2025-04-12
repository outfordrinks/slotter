import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFigmaStore } from "@/store"

export function FigmaInput() {
  const { fileKey, setFileKey, reset } = useFigmaStore()

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Figma File Input</CardTitle>
        <CardDescription>Enter your Figma file URL to load the design</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="figmaUrl">Figma URL</Label>
              <Input
                id="figmaUrl"
                type="text"
                placeholder="Enter Figma file URL"
                value={fileKey || ''}
                onChange={(e) => setFileKey(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={reset}>Reset</Button>
        <Button onClick={() => {}}>Load File</Button>
      </CardFooter>
    </Card>
  )
}