import { FigmaInput } from "@/components/FigmaInput"

export function EditorPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Template Editor</h2>
        <p className="mt-2 text-gray-600">Import a Figma frame to start creating your template</p>
      </div>
      <FigmaInput />
    </div>
  )
} 