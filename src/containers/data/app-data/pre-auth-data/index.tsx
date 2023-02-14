import { PropsWithChildren, useEffect } from 'react'
import { batch } from 'react-redux'

import { getLocaleList } from 'shared/i18n'
import { useAppDispatch } from 'shared/model'

import { getUserInfo } from 'entities/user'

export const PreAuthData: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		batch(() => {
			dispatch(getLocaleList())
			dispatch(getUserInfo())
		})
	}, [])

	return <>{children}</>
}
