import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { EditorPage } from './pages/EditorPage'
import { TemplatePage } from './pages/TemplatePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
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
    </ThemeProvider>
  )
}

export default App
