import { useEffect, useState } from 'react'

import { BackdropSpinner } from 'shared/ui'
import { RequestStatus, useAppDispatch } from 'shared/model'
import { convertersLib } from 'shared/lib'

import { selectModel } from 'entities/select'
import { userModel, useUser } from 'entities/user'

export const withAppData = (Component: new () => React.Component) => () => {
	console.log('with app data')
	const dispatch = useAppDispatch()

	const [status, setStatus] = useState<RequestStatus>(undefined)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const userInfo = useUser()
	const idUser = userInfo?.uid

	useEffect(() => {
		if (!idUser) {
			return
		}

		const loadData = async () => {
			setStatus('loading')
			setErrorMsg(null)

			try {
				await Promise.all([
					dispatch(selectModel.getSelectList()),
					dispatch(userModel.getSettingList()),
					dispatch(userModel.getLayerList()),
					dispatch(userModel.getUserProps({ idUser })),
				])

				setStatus('success')
			} catch (e) {
				setStatus('error')
				setErrorMsg(convertersLib.errorToString(e))
			}
		}

		loadData()
	}, [idUser])

	if (status === undefined) {
		return null
	}

	if (status === 'loading') {
		return <BackdropSpinner />
	}

	if (status === 'error') {
		return <div>{errorMsg}</div>
	}

	return <Component />
}
