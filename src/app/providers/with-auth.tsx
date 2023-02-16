import { Box } from '@mui/material'

import { useUserIsAuth } from 'entities/user'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export const withAuth = (Component: new () => React.Component) => () => {
	const isAuth = useUserIsAuth()
	console.log('render with auth', isAuth)

	return !isAuth ? <Box>Please, authorized!</Box> : <Component />
}
