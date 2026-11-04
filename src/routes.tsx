import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { Cadastro } from '@/pages/Cadastro'
import { Dashboard } from '@/pages/Dashboard'
import { Login } from '@/pages/Login'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/register', element: <Cadastro /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '*', element: <NotFoundPage /> },
])
