import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export function NotFoundPage() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-8 py-16", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900", children: "404" }), _jsx("p", { className: "mt-2 text-xl text-gray-600", children: "Page not found" }), _jsx("p", { className: "mt-1 text-gray-500", children: "The page you're looking for doesn't exist or has been moved." })] }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: "/", children: "Go back home" }) })] }));
}
