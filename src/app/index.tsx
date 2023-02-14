import { withProviders } from 'app/providers'

import { Routing } from 'pages'
import { AppData } from 'containers'
import { AuthByUsername } from 'widgets/auth'

import 'app/index.scss'

const App = () => {
	return (
		<AppData>
			<AuthByUsername>
				<Routing />
			</AuthByUsername>
		</AppData>
	)
}

export default withProviders(App)
