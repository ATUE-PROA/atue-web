import { createBrowserRouter } from 'react-router-dom'
import { AppRoot } from '@/components/layout/app-root'
import LandingPage from '@/pages/LandingPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { Cadastro } from '@/pages/Cadastro'
import { Dashboard } from '@/pages/Dashboard'
import { Documents } from '@/pages/Documents'
import { FormPage } from '@/pages/FormPage'
import { Login } from '@/pages/Login'
import { Plans } from '@/pages/Plans'
import { Profile } from '@/pages/Profile'
import { Settings } from '@/pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoot />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'register', element: <Cadastro /> },
      { path: 'login', element: <Login /> },
      { path: 'form', element: <FormPage /> },
      { path: 'plans', element: <Plans /> },
      { path: 'plan', element: <Plans /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'documents', element: <Documents /> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
