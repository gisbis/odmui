import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSettings } from './thunk'
import type { ISetting } from './types'

interface I18nState {
	settingList: ISetting[]
}

const initialState: I18nState = {
	settingList: [],
}

const state = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettingList(state, action: PayloadAction<ISetting[]>) {
			state.settingList = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getSettings.fulfilled, (state, action) => {
			state.settingList = action.payload
		})
		builder.addCase(getSettings.rejected, (state, action) => {})
		builder.addCase(getSettings.pending, (state) => {})
	},
})

export const { reducer: settingsReducer, actions: settingActions } = state
