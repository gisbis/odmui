import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUser } from 'entities/user'

export const AuthRequired: React.FC<PropsWithChildren> = ({ children }) => {
	const { isAuth } = useUser()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuth) {
			return
		}

		navigate('/login')
	}, [isAuth])

	return <>{children}</>
}
