import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface FigmaState {
  fileKey: string | null
  nodeId: string | null
  isLoading: boolean
  error: string | null
  setFileKey: (fileKey: string) => void
  setNodeId: (nodeId: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useFigmaStore = create<FigmaState>()(
  immer((set) => ({
    fileKey: null,
    nodeId: null,
    isLoading: false,
    error: null,
    setFileKey: (fileKey) => set((state) => { state.fileKey = fileKey }),
    setNodeId: (nodeId) => set((state) => { state.nodeId = nodeId }),
    setLoading: (isLoading) => set((state) => { state.isLoading = isLoading }),
    setError: (error) => set((state) => { state.error = error }),
    reset: () => set((state) => {
      state.fileKey = null
      state.nodeId = null
      state.isLoading = false
      state.error = null
    }),
  }))
) 