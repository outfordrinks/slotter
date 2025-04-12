import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
const initialState = {
    theme: "system",
    setTheme: () => null,
};
const ThemeProviderContext = createContext(initialState);
export function ThemeProvider({ children, defaultTheme = "system", ...props }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx(NextThemesProvider, { attribute: "class", defaultTheme: defaultTheme, enableSystem: true, ...props, children: children }));
}
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
