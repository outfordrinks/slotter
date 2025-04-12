import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export function TemplatePage() {
    const { id } = useParams();
    return (_jsxs("div", { className: "flex flex-col items-center gap-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Template Preview" }), _jsxs("p", { className: "mt-2 text-gray-600", children: ["Template ID: ", id] })] }), _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Template Content" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-gray-600", children: "Template content will be displayed here" }) })] })] }));
}
