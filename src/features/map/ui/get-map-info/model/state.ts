import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { convertersLib } from 'shared/lib'
import { RequestStatus } from 'shared/model'

import { getMapInfo } from './thunk'

interface IMapInfoState {
	data: IMapInfoRowData[] | null
	errorMsg: string | null
	status: RequestStatus
}

const initialState: IMapInfoState = {
	data: null,
	status: undefined,
	errorMsg: null,
}

const slice = createSlice({
	name: 'mapInfo',
	initialState,
	reducers: {
		setData(state, action: PayloadAction<IMapInfoRow[] | null>) {
			state.data = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMapInfo.fulfilled, (state, action) => {
			state.status = 'success'
			state.data = action.payload
		})
		builder.addCase(getMapInfo.rejected, (state, action) => {
			state.errorMsg = convertersLib.errorToString(action.payload)
			state.status = 'error'
		})
		builder.addCase(getMapInfo.pending, (state) => {
			state.status = 'loading'
			state.errorMsg = null
		})
	},
})

export const { reducer: mapInfoReducer, actions: mapInfoActions } = slice
