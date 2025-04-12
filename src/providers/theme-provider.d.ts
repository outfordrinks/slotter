type Theme = "dark" | "light" | "system";
type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
};
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
export declare function ThemeProvider({ children, defaultTheme, ...props }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeProviderState;
export {};
