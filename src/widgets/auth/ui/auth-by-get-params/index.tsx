import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from 'shared/model'
import { getUserInfo } from 'entities/user'
import { authApi } from 'features/auth'

export const AuthByGetParams = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [searchParams] = useSearchParams()
	const username = searchParams.get('username')
	const logout = searchParams.get('logout')

	useEffect(() => {
		if (!username) {
			return
		}

		authApi.login({ username }).then(() => {
			dispatch(getUserInfo())
				.unwrap()
				.then(() => {
					navigate('/')
				})
		})
	}, [username])

	useEffect(() => {
		if (!logout) {
			return
		}

		authApi.logout().then(() => {
			dispatch(getUserInfo())
				.unwrap()
				.then(() => {
					navigate('/login')
				})
		})
	}, [logout])

	return null
}
