import compose from 'compose-function'

import { withStore } from './with-store'
import { withRouter } from './with-router'
import { withTheme } from './with-theme'
import { withAuth } from './with-auth'
import { withSearchQuery } from './with-search-query'
import { withAppData } from './with-app-data'
import { withPreRenderData } from './with-pre-render-data'
import { withExtendSession } from './with-extend-session'

export const withProviders = compose(
	withStore,
	withPreRenderData,
	withRouter,
	withSearchQuery,
	withAuth,
	withExtendSession,
	withAppData,
	withTheme
)
