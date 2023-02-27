import { Box } from '@mui/material'

import { useUserIsAuth } from 'entities/user'

export const withAuth = (Component: new () => React.Component) => () => {
	const isAuth = useUserIsAuth()

	return !isAuth ? <Box>Please, authorized!</Box> : <Component />
}
