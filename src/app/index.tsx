import { withProviders } from 'app/providers'

import { Routing } from 'pages'
import { AppDataContainer, UserDataContainer } from './containers'
import { ExtendSession } from 'processes'

import 'app/index.scss'

const App = () => {
	return (
		<>
			<ExtendSession />

			<AppDataContainer>
				<UserDataContainer>
					<Routing />
				</UserDataContainer>
			</AppDataContainer>
		</>
	)
}

export default withProviders(App)
