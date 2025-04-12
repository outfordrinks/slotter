import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet } from 'react-router-dom';
export function RootLayout() {
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx("header", { className: "bg-background border-b border-border", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [_jsx(Link, { to: "/", className: "text-xl font-semibold", children: "Slotter" }), _jsxs("nav", { className: "flex gap-4", children: [_jsx(Link, { to: "/editor", className: "text-muted-foreground hover:text-foreground", children: "Editor" }), _jsx(Link, { to: "/template/demo", className: "text-muted-foreground hover:text-foreground", children: "Templates" })] })] }) }), _jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsx(Outlet, {}) })] }));
}
