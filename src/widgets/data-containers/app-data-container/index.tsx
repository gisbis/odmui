import { PropsWithChildren, useEffect } from 'react'

import { useActionCreators, useAppDispatch, useAppSelector } from 'shared/model'
import { appActions } from 'shared/model'
import { convertersLib } from 'shared/lib'

import { getLocaleList } from 'shared/i18n/model'
import { getUserInfo } from 'entities/user/model'
import { getAppSettings } from 'shared/app-settings'

export const AppDataContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()
	const actions = useActionCreators(appActions)

	const status = useAppSelector((state) => state.app.status)
	const errorMsg = useAppSelector((state) => state.app.errorMsg)

	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		actions.setStatus('loading')

		try {
			await Promise.all([
				dispatch(getLocaleList()),
				dispatch(getUserInfo()),
				dispatch(getAppSettings()),
			])

			actions.setStatus('success')
		} catch (e) {
			actions.setStatus('error')
			actions.setErrorMsg(convertersLib.errorToString(e))
		}
	}

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (status === 'error') {
		return <div>Error: {errorMsg}</div>
	}

	return <>{children}</>
}
