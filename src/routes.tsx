import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { Cadastro } from '@/pages/Cadastro'
import { Dashboard } from '@/pages/Dashboard'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/cadastro', element: <Cadastro /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '*', element: <NotFoundPage /> },
])
