import { Provider } from 'react-redux'
import { store } from './redux-toolkit'

export const withStore = (component: () => React.ReactNode) => () => {
	return <Provider store={store}>{component()}</Provider>
}
