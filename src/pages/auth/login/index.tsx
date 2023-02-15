import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { Box } from '@mui/material'
import { useAppDispatch } from 'shared/model'
import { authApi } from 'features/auth'
import { getUserInfo } from 'entities/user'

const LoginPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { username } = useParams()

	console.log('render login', username)

	useEffect(() => {
		if (!username) {
			return
		}

		console.log('username', username)
		authApi.login({ username }).then(() => {
			dispatch(getUserInfo())
				.unwrap()
				.then(() => {
					console.log('login')
					navigate('/')
				})
		})
	}, [username])

	return <Box>Please authorize</Box>
}

export default LoginPage
