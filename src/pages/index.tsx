import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const TestPage = lazy(() => import('./test'))
const MapPage = lazy(() => import('./map'))

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<MapPage />} />
			<Route path="/*" element={<MapPage />} />
		</Routes>
	)
}
