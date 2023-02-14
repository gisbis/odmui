import { withProviders } from 'app/providers'

import { Routing } from 'pages'
import { PostAuthData, PreAuthData } from 'containers'
import { AuthByUsername } from 'widgets/auth'

import 'app/index.scss'

const App = () => {
	return (
		<PreAuthData>
			<AuthByUsername>
				<PostAuthData>
					<Routing />
				</PostAuthData>
			</AuthByUsername>
		</PreAuthData>
	)
}

export default withProviders(App)
