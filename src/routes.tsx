import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { Cadastro } from '@/pages/Cadastro'
import { Dashboard } from '@/pages/Dashboard'
import { FormPage } from '@/pages/FormPage'
import { Login } from '@/pages/Login'
import { Plans } from '@/pages/Plans'
import { Profile } from '@/pages/Profile'
import { Settings } from '@/pages/Settings'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/register', element: <Cadastro /> },
  { path: '/login', element: <Login /> },
  { path: '/form', element: <FormPage /> },
  { path: '/plans', element: <Plans /> },
  { path: '/plan', element: <Plans /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/profile', element: <Profile /> },
  { path: '/settings', element: <Settings /> },
  { path: '*', element: <NotFoundPage /> },
])
