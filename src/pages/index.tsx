import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const MapPage = lazy(() => import('./map'))
const LoginPage = lazy(() => import('./auth/login'))

export const Routing = () => {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />

			<Route path="/*" element={<MapPage />} />
		</Routes>
	)
}
