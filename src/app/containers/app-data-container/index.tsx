import { PropsWithChildren, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { BackdropSpinner } from 'shared/ui'

import { getAppData } from '../../model/thunk'

export const AppDataContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	const status = useAppSelector((state) => state.app.status)
	const errorMsg = useAppSelector((state) => state.app.errorMsg)

	useEffect(() => {
		dispatch(getAppData())
	}, [])

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
