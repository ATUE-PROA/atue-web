import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { AuthProvider } from '@/contexts/AuthProvider'
import { PlanProvider } from '@/contexts/PlanProvider'
import { watchSystemTheme } from '@/lib/theme'
import './index.css'

watchSystemTheme()

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento #root não encontrado em index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <PlanProvider>
        <RouterProvider router={router} />
      </PlanProvider>
    </AuthProvider>
  </StrictMode>,
)
