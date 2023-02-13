import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAppSettings } from './thunk'
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
		setAppSettingList(state, action: PayloadAction<ISetting[]>) {
			state.settingList = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAppSettings.fulfilled, (state, action) => {
			state.settingList = action.payload
		})
		builder.addCase(getAppSettings.rejected, (state, action) => {})
		builder.addCase(getAppSettings.pending, (state) => {})
	},
})

export const { reducer: settingsReducer, actions: settingActions } = state
