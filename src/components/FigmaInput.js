import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFigmaStore } from "@/store";
export function FigmaInput() {
    const { fileKey, setFileKey, reset } = useFigmaStore();
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Figma File Input" }), _jsx(CardDescription, { children: "Enter your Figma file URL to load the design" })] }), _jsx(CardContent, { children: _jsx("form", { children: _jsx("div", { className: "grid w-full items-center gap-4", children: _jsxs("div", { className: "flex flex-col space-y-1.5", children: [_jsx(Label, { htmlFor: "figmaUrl", children: "Figma URL" }), _jsx(Input, { id: "figmaUrl", type: "text", placeholder: "Enter Figma file URL", value: fileKey || '', onChange: (e) => setFileKey(e.target.value) })] }) }) }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: reset, children: "Reset" }), _jsx(Button, { onClick: () => { }, children: "Load File" })] })] }));
}
