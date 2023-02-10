import compose from 'compose-function'

import { withStore } from './with-store'
import { withRouter } from './with-router'
import { withTheme } from './with-theme'

export const withProviders = compose(withRouter, withStore, withTheme)
