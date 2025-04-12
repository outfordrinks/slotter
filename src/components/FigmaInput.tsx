import { useEffect } from "react"
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
import { useToast } from '@/hooks/use-toast'
import { parseFigmaUrl } from "@/utils/figmaUrlParser"
import { fetchFigmaFile } from "@/utils/figmaApi"
import { transformDocument } from "@/utils/nodeTransforms"

export function FigmaInput() {
  console.log('🔄 FigmaInput component rendered')
  
  const {
    fileKey,
    setFileKey,
    setRootNode,
    setNodeId,
    isLoading,
    setLoading
  } = useFigmaStore()

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
    try {
      console.log('🚀 Load file initiated')

      if (!fileKey) {
        console.log('⚠️ No file key provided')
        toast({
          title: 'Error',
          description: 'Please enter a Figma file URL',
          variant: 'destructive',
        })
        return
      }

      // Set loading state
      console.log('⏳ Setting loading state')
      setLoading(true)

      // Parse the URL to get fileKey and nodeId
      console.log('🔍 Parsing URL:', fileKey)
      const { fileKey: parsedKey, nodeId } = parseFigmaUrl(fileKey)
      console.log('✅ URL parsed successfully:', { parsedKey, nodeId })
      
      // Store nodeId in the store
      if (nodeId) {
        console.log('💾 Storing nodeId:', nodeId)
        setNodeId(nodeId)
      }

      // Fetch the file data
      console.log('📡 Fetching file data...')
      const response = await fetchFigmaFile({ fileKey: parsedKey, nodeId })
      console.log('✅ File data fetched:', response)

      if ('error' in response && response.error) {
        console.log('❌ Error in response:', response.error)
        toast({
          title: 'Error',
          description: response.error.err,
          variant: 'destructive',
        })
        return
      }

      if (!response.file?.document) {
        console.log('❌ No document in response')
        toast({
          title: 'Error',
          description: 'Invalid file data received',
          variant: 'destructive',
        })
        return
      }

      // Transform the document
      console.log('🔄 Transforming document...')
      const transformedData = transformDocument(response.file.document, response.file.imageUrls)
      console.log('✅ Document transformed:', transformedData)

      // Store the transformed data
      console.log('💾 Storing transformed data')
      setRootNode(transformedData)

      console.log('✅ Load file completed successfully')
      toast({
        title: 'Success',
        description: 'File loaded successfully',
      })

    } catch (error) {
      console.error('❌ Error loading file:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load file',
        variant: 'destructive',
      })
    } finally {
      console.log('🔄 Resetting loading state')
      setLoading(false)
    }
  }

  const handleReset = () => {
    console.log('🔄 Reset initiated')
    setFileKey('')
    setRootNode(null)
    setNodeId('')
    console.log('✅ Reset completed')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📝 Input changed:', event.target.value)
    setFileKey(event.target.value)
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
                disabled={isLoading}
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