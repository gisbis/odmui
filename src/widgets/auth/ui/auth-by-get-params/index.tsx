import { PropsWithChildren, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'shared/model'

import { login } from 'features/auth/api'
import { getUserInfo } from 'entities/user'

export const AuthByUsername: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()
	const sessId = useAppSelector((state) => state.user.sessId)

	const [searchParams] = useSearchParams()
	const username = searchParams.get('username')

	useEffect(() => {
		if (!!sessId || !username) {
			return
		}

		login({ username }).then(() => {
			dispatch(getUserInfo())
		})
	}, [sessId, username])

	return <>{children}</>
}
