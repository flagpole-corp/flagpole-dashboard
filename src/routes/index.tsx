import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { SignIn } from '~/pages/SignIn'
import { createRoute } from '../factories/createRoute'
import { BasePageLayout } from '~/components'
import { DASHBOARD_ROUTES } from './dashboard'

export const APP_ROUTES = {
  HOME: createRoute({ path: '/' }),
  SIGNIN: createRoute({ path: '/signin', guestOnly: true }),
  SIGNUP: createRoute({ path: '/signup', guestOnly: true }),
  DASHBOARD: createRoute({ path: '/dashboard', protected: true }),
  FLAGS: createRoute({ path: '/flags', protected: true }),
} as const

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.SIGNIN.path,
    element: (
      <ProtectedRoute guestOnly>
        <SignIn />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <BasePageLayout />
      </ProtectedRoute>
    ),
    children: DASHBOARD_ROUTES as RouteObject[], // Type assertion here
  },
] satisfies RouteObject[])

export const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />
}
