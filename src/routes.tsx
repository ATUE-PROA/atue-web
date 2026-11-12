import { createBrowserRouter } from 'react-router-dom'
import { AppRoot } from '@/components/layout/app-root'
import LandingPage from '@/pages/LandingPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { Cadastro } from '@/pages/Cadastro'
import { Contact } from '@/pages/Contact'
import { Dashboard } from '@/pages/Dashboard'
import { Documents } from '@/pages/Documents'
import { FormPage } from '@/pages/FormPage'
import { Login } from '@/pages/Login'
import { Plans } from '@/pages/Plans'
import { Privacy } from '@/pages/Privacy'
import { Profile } from '@/pages/Profile'
import { Settings } from '@/pages/Settings'
import { Terms } from '@/pages/Terms'

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
      { path: 'privacidade', element: <Privacy /> },
      { path: 'termos', element: <Terms /> },
      { path: 'contato', element: <Contact /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
