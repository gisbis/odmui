import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
	ActionCreatorsMapObject,
	AsyncThunk,
	bindActionCreators,
} from '@reduxjs/toolkit'
import { useMemo } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
	actions: Actions
) => {
	const dispatch = useAppDispatch()
	return useMemo(() => bindActionCreators(actions, dispatch), [])
}
