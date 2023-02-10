import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RequestStatus } from './types'

export interface IAppState {
	status: RequestStatus
	errorMsg: string | null
}

const initialState: IAppState = {
	errorMsg: null,
	status: undefined,
}

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setStatus(state, action: PayloadAction<RequestStatus>) {
			state.status = action.payload
		},
		setErrorMsg(state, action: PayloadAction<string | null>) {
			state.errorMsg = action.payload
		},
		resetState: () => initialState,
	},
})

export const { reducer: appReducer, actions: appActions } = slice
