import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const MapPage = lazy(() => import('pages/map/MapPage'))
const TestPage = lazy(() => import('pages/test/TestPage'))

const router = createBrowserRouter([
	{
		path: '/',
		element: <TestPage />,
	},
	{
		path: '/map',
		element: <MapPage />,
	},
])

export const Routing = () => {
	return <RouterProvider router={router} />
}
