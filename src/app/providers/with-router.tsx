import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

export const withRouter = (Component: new () => React.Component) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<>Loading page...</>}>
				<Component />
			</Suspense>
		</BrowserRouter>
	)
}
