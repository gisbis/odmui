import { PropsWithChildren, useEffect } from 'react'

import { useAppDispatch } from 'shared/model'
import { getSettings } from 'shared/settings'

export const PostAuthData: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getSettings())
	}, [])

	return <>{children}</>
}
