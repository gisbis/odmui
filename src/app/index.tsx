import { withProviders } from 'app/providers'

import { Routing } from 'pages'
import { DataContainer } from 'app/containers/DataContainer'

import 'app/index.scss'

const App = () => {
	return (
		<DataContainer>
			<Routing />
		</DataContainer>
	)
}

export default withProviders(App)
