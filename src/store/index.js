import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
export const useFigmaStore = create()(immer((set) => ({
    fileKey: null,
    nodeId: null,
    isLoading: false,
    error: null,
    setFileKey: (fileKey) => set((state) => { state.fileKey = fileKey; }),
    setNodeId: (nodeId) => set((state) => { state.nodeId = nodeId; }),
    setLoading: (isLoading) => set((state) => { state.isLoading = isLoading; }),
    setError: (error) => set((state) => { state.error = error; }),
    reset: () => set((state) => {
        state.fileKey = null;
        state.nodeId = null;
        state.isLoading = false;
        state.error = null;
    }),
})));
