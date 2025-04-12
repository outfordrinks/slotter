import { FigmaInput } from "@/components/FigmaInput"
import { useEffect } from "react"

export function EditorPage() {
  useEffect(() => {
    console.log('EditorPage mounted')
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h2 className="text-2xl font-bold text-foreground">Template Editor</h2>
      <p className="mt-2 text-muted-foreground">Import a Figma frame to start creating your template</p>
      <div className="mt-8">
        <FigmaInput />
      </div>
    </div>
  )
} 