import { create } from 'zustand'
import { BaseNode } from '@/types/figma'

interface FigmaState {
  fileKey: string | null
  nodeId: string | null
  isLoading: boolean
  error: string | null
  // Transformed data
  rootNode: BaseNode | null
  setFileKey: (fileKey: string) => void
  setNodeId: (nodeId: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setRootNode: (node: BaseNode | null) => void
  reset: () => void
}

export const useFigmaStore = create<FigmaState>((set) => ({
  fileKey: null,
  nodeId: null,
  isLoading: false,
  error: null,
  rootNode: null,
  setFileKey: (fileKey) => set({ fileKey }),
  setNodeId: (nodeId) => set({ nodeId }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setRootNode: (node) => set({ rootNode: node }),
  reset: () => set({
    fileKey: null,
    nodeId: null,
    isLoading: false,
    error: null,
    rootNode: null
  }),
})) 