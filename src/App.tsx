import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { EditorPage } from './pages/EditorPage.tsx'
import { TemplatePage } from './pages/TemplatePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to="/editor" replace />} />
            <Route path="editor" element={<EditorPage />} />
            <Route path="template/:id" element={<TemplatePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
