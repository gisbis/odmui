import { createSlice } from '@reduxjs/toolkit'

import type { ISelectGroup } from 'shared/api/select'

import { getSelectList } from './thunk'

interface ISelectState {
	selectList: ISelectGroup[]
}

const initialState: ISelectState = {
	selectList: [],
}

const slice = createSlice({
	name: 'select',
	initialState,
	reducers: {
		resetState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getSelectList.fulfilled, (state, action) => {
			state.selectList = action.payload
		})
	},
})

export const { reducer: selectReducer, actions: selectActions } = slice
