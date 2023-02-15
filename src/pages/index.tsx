import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRequired } from 'containers'

const MapPage = lazy(() => import('./map'))
const LoginPage = lazy(() => import('./auth/login'))
const LogoutPage = lazy(() => import('./auth/logout'))

export const Routing = () => {
	console.log('render routing')
	return (
		<Routes>
			<Route path="/login/:username" element={<LoginPage />} />
			<Route path="/logout" element={<LogoutPage />} />

			<Route
				path="/"
				element={
					<AuthRequired>
						<MapPage />
					</AuthRequired>
				}
			/>

			<Route path="/*" element={<div>Page not found</div>} />
		</Routes>
	)
}
