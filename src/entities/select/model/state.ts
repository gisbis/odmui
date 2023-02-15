import { createSlice } from '@reduxjs/toolkit'

import { getSelectList } from './thunk'
import type { ISelectGroup } from './types'

import { RequestStatus } from 'shared/model'
import { convertersLib } from 'shared/lib'

interface ISelectState {
	selectList: ISelectGroup[]
	status: RequestStatus
	errorMsg: string | null
}

const initialState: ISelectState = {
	selectList: [],
	status: undefined,
	errorMsg: null,
}

const slice = createSlice({
	name: 'select',
	initialState,
	reducers: {
		resetState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getSelectList.pending, (state, action) => {
			state.errorMsg = null
			state.status = 'loading'
		})
		builder.addCase(getSelectList.fulfilled, (state, action) => {
			state.status = 'success'
			state.selectList = action.payload
		})
		builder.addCase(getSelectList.rejected, (state, action) => {
			state.status = 'error'
			state.errorMsg = convertersLib.errorToString(action.error.message)
			state.selectList = []
		})
	},
})

export const { reducer: selectReducer, actions: selectActions } = slice
