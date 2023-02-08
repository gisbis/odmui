import { PropsWithChildren, useEffect } from 'react'

import { getLocaleList } from 'entities/i18n/model'
import { appActions, useActionCreators, useAppDispatch } from 'shared/model'

export const DataContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()
	const actions = useActionCreators(appActions)

	useEffect(() => {
		actions.setIsLoading(true)

		dispatch(getLocaleList())
			.unwrap()
			.catch((e) => {
				actions.setError(e)
			})
			.finally(() => {
				setTimeout(() => {
					actions.setIsLoading(false)
				}, 3000)
			})
	}, [])

	return <>{children}</>
}
