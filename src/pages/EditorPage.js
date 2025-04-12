import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FigmaInput } from "@/components/FigmaInput";
export function EditorPage() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]", children: [_jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Template Editor" }), _jsx("p", { className: "mt-2 text-muted-foreground", children: "Import a Figma frame to start creating your template" }), _jsx("div", { className: "mt-8", children: _jsx(FigmaInput, {}) })] }));
}
