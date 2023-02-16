import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const MapPage = lazy(() => import('./map'))

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<MapPage />} />
			<Route path="/*" element={<div>Page not found</div>} />
		</Routes>
	)
}
