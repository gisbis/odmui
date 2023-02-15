import { createSlice } from '@reduxjs/toolkit'
import { convertersLib } from 'shared/lib'
import { RequestStatus } from 'shared/model'
import { getAppData } from './thunk'

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
		resetState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getAppData.fulfilled, (state, action) => {
			state.status = 'success'
		})
		builder.addCase(getAppData.pending, (state, action) => {
			state.errorMsg = null
			state.status = 'loading'
		})
		builder.addCase(getAppData.rejected, (state, action) => {
			state.errorMsg = convertersLib.errorToString(action.error.message)
			state.status = 'error'
		})
	},
})

export const { reducer: appReducer, actions: appActions } = slice
