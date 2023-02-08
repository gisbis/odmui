import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

export const withRouter = (component: () => React.ReactNode) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback="Loading...">{component()}</Suspense>
		</BrowserRouter>
	)
}
