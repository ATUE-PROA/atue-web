import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import CadastroPlaceholderPage from '@/pages/CadastroPlaceholderPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/cadastro', element: <CadastroPlaceholderPage /> },
  { path: '*', element: <NotFoundPage /> },
])
