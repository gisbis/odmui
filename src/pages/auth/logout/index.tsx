import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { authApi } from 'features/auth'
import { useAppDispatch } from 'shared/model'
import { getUserInfo } from 'entities/user'

const LogoutPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		authApi.logout().then(() => {
			dispatch(getUserInfo())
				.unwrap()
				.then(() => {
					navigate('/login')
				})
		})
	}, [])

	return null
}

export default LogoutPage
