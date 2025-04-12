import { useState, useEffect } from "react"
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
import { parseFigmaUrl } from "@/utils/figmaUrlParser"
import { fetchFigmaFile } from "@/utils/figmaApi"
import { useToast } from "@/hooks/use-toast"

export function FigmaInput() {
  console.log('🔄 FigmaInput component rendered')
  
  const { fileKey, setFileKey, reset } = useFigmaStore()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Component mount and update logging
  useEffect(() => {
    console.log('🎯 Component mounted/updated with state:', {
      fileKey,
      isLoading,
      hasToast: !!toast
    })
    
    return () => {
      console.log('👋 Component unmounting')
    }
  }, [fileKey, isLoading, toast])

  const handleLoadFile = async () => {
    console.log('🚀 handleLoadFile initiated', {
      fileKey,
      isLoading
    })

    if (!fileKey) {
      console.warn('⚠️ No fileKey provided')
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a Figma URL",
      })
      return
    }
    
    try {
      setIsLoading(true)
      console.log('🔍 Parsing URL:', fileKey)
      
      // Parse the URL to get fileKey and nodeId
      const { fileKey: parsedKey, nodeId } = parseFigmaUrl(fileKey)
      console.log('✅ URL parsed successfully:', { parsedKey, nodeId })
      
      // Fetch the file data
      console.log('📡 Fetching file data...')
      const response = await fetchFigmaFile({ fileKey: parsedKey, nodeId })
      console.log('📦 API Response received:', response)
      
      if (response.error) {
        console.error('❌ API returned error:', response.error)
        throw new Error(response.error.err)
      }

      if (!response.file) {
        console.error('❌ No file data in response')
        throw new Error('No file data received')
      }

      // Show success message
      console.log('✨ File loaded successfully:', response.file.name)
      toast({
        title: "Success",
        description: `Loaded file: ${response.file.name}`,
      })

    } catch (error) {
      console.error('💥 Error in handleLoadFile:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load Figma file',
      })
    } finally {
      console.log('🏁 handleLoadFile completed, resetting loading state')
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    console.log('🔄 Reset initiated')
    reset()
    console.log('✅ Reset completed')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📝 Input changed:', {
      oldValue: fileKey,
      newValue: e.target.value
    })
    setFileKey(e.target.value)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Figma File Input</CardTitle>
        <CardDescription>Enter your Figma file URL to load the design</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { 
          console.log('📝 Form submitted')
          e.preventDefault()
          handleLoadFile()
        }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="figmaUrl">Figma URL</Label>
              <Input
                id="figmaUrl"
                type="text"
                placeholder="Enter Figma file URL"
                value={fileKey || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleReset} 
          disabled={isLoading}
        >
          Reset
        </Button>
        <Button 
          onClick={() => {
            console.log('🔘 Load File button clicked')
            handleLoadFile()
          }} 
          disabled={!fileKey || isLoading}
        >
          {isLoading ? "Loading..." : "Load File"}
        </Button>
      </CardFooter>
    </Card>
  )
}