import React, { PropsWithChildren, useEffect } from 'react'

import { BackdropSpinner } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { getUserData, useUser, userActions } from 'entities/user'
import { useNavigate } from 'react-router'

export const UserDataContainer: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const status = useAppSelector((state) => state.user.status)
	const errorMsg = useAppSelector((state) => state.user.errorMsg)

	const { isAuth, user } = useUser()

	console.log('render UserDataContainer', { isAuth, user })

	useEffect(() => {
		if (!isAuth || !user?.uid) {
			dispatch(userActions.setStatus('success'))
			return
		}

		dispatch(getUserData({ idUser: user.uid }))
	}, [user, isAuth])

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <BackdropSpinner open={true} />
	}

	if (status === 'error') {
		return <div>{errorMsg}</div>
	}

	return <>{children}</>
}
