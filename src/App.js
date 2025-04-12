import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { EditorPage } from './pages/EditorPage';
import { TemplatePage } from './pages/TemplatePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThemeProvider } from "@/components/theme-provider";
function App() {
    return (_jsx(ThemeProvider, { defaultTheme: "dark", attribute: "class", children: _jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(RootLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/editor", replace: true }) }), _jsx(Route, { path: "editor", element: _jsx(EditorPage, {}) }), _jsx(Route, { path: "template/:id", element: _jsx(TemplatePage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }) }) }));
}
export default App;
