import { withProviders } from 'app/providers'

import { Routing } from 'pages'
import { AppDataContainer } from 'widgets/data-containers'

import 'app/index.scss'

const App = () => {
	return (
		<AppDataContainer>
			<Routing />
		</AppDataContainer>
	)
}

export default withProviders(App)
