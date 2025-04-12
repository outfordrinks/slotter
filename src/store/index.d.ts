interface FigmaState {
    fileKey: string | null;
    nodeId: string | null;
    isLoading: boolean;
    error: string | null;
    setFileKey: (fileKey: string) => void;
    setNodeId: (nodeId: string) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}
export declare const useFigmaStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<FigmaState>, "setState"> & {
    setState(nextStateOrUpdater: FigmaState | Partial<FigmaState> | ((state: import("immer").WritableDraft<FigmaState>) => void), shouldReplace?: boolean | undefined): void;
}>;
export {};
