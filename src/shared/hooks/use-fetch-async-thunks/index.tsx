import { useCallback, useEffect, useState } from 'react'
import { AsyncThunkAction } from '@reduxjs/toolkit'

import { RequestStatus, useAppDispatch } from 'shared/model'
import { convertersLib } from 'shared/lib'

export const useFetchAsyncThunks = (
	thunks: AsyncThunkAction<any, any, any>[]
) => {
	const dispatch = useAppDispatch()

	const [status, setStatus] = useState<RequestStatus>(undefined)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const dispatchThunks = useCallback(async () => {
		setStatus('loading')
		setErrorMsg(null)

		try {
			await Promise.all(thunks.map((thunk) => dispatch(thunk)))
			setStatus('success')
		} catch (e) {
			setStatus('error')
			setErrorMsg(convertersLib.errorToString(e))
		}
	}, [thunks])

	useEffect(() => {
		dispatchThunks()
	}, [])

	return { status, errorMsg }
}
