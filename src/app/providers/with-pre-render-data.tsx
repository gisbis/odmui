import { useEffect, useState } from 'react'

import { RequestStatus, useAppDispatch } from 'shared/model'
import { i18nModel } from 'shared/i18n'
import { convertersLib } from 'shared/lib'
import { userModel } from 'entities/user'

export const withPreRenderData =
	(Component: new () => React.Component) => () => {
		const dispatch = useAppDispatch()

		const [status, setStatus] = useState<RequestStatus>(undefined)
		const [errorMsg, setErrorMsg] = useState<string | null>(null)

		useEffect(() => {
			const loadData = async () => {
				setStatus('loading')
				setErrorMsg(null)

				try {
					await Promise.all([
						dispatch(i18nModel.getI18nData())
							.unwrap()
							.catch((e) => {
								throw e
							}),
						dispatch(userModel.getUserInfo())
							.unwrap()
							.catch((e) => {
								throw e
							}),
					])

					setStatus('success')
				} catch (e) {
					setStatus('error')
					setErrorMsg(convertersLib.errorToString(e))
				}
			}

			loadData()
		}, [])

		if (status === undefined) {
			return null
		}

		if (status === 'loading') {
			return null
		}

		if (status === 'error') {
			return <div>{errorMsg}</div>
		}

		return <Component />
	}
