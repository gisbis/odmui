import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { BackdropSpinner } from 'shared/ui'

export const withRouter = (Component: new () => React.Component) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<BackdropSpinner />}>
				<Component />
			</Suspense>
		</BrowserRouter>
	)
}
