import { Provider } from 'react-redux'
import { store } from 'app/store'

export const withStore = (Component: new () => React.Component) => () => {
	return (
		<Provider store={store}>
			<Component />
		</Provider>
	)
}
