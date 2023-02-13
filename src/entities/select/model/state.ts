import { createSlice } from '@reduxjs/toolkit'

import { getLayerList, getSelectList } from './thunk'
import type { ILayer, ISelectGroup } from './types'

interface ISelectState {
	layerList: ILayer[]
	selectList: ISelectGroup[]
}

const initialState: ISelectState = {
	layerList: [],
	selectList: [],
}

const slice = createSlice({
	name: 'select',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getLayerList.fulfilled, (state, action) => {
			state.layerList = action.payload
		})
		builder.addCase(getSelectList.fulfilled, (state, action) => {
			state.selectList = action.payload
		})
	},
})

export const { reducer: selectReducer, actions: selectActions } = slice
