import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getLocaleList } from './thunk'
import type { I18nLng, I18nLocale } from '../model'

interface I18nState {
	localeList: I18nLocale[]
	lngList: I18nLng[]
	currentLng: string | null
}

const initialState: I18nState = {
	localeList: [],
	lngList: [],
	currentLng: null,
}

const state = createSlice({
	name: 'i18n',
	initialState,
	reducers: {
		setLocaleList(state, action: PayloadAction<I18nLocale[]>) {
			state.localeList = action.payload
		},
		setLngList(state, action: PayloadAction<I18nLng[]>) {
			state.lngList = action.payload
		},
		setCurrentLng(state, action: PayloadAction<string>) {
			state.currentLng = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getLocaleList.fulfilled, (state, action) => {
			const { localeList, lngList, currentLng } = action.payload
			state.localeList = localeList
			state.lngList = lngList
			state.currentLng = currentLng
		})
		builder.addCase(getLocaleList.rejected, (state, action) => {})
		builder.addCase(getLocaleList.pending, (state) => {})
	},
})

export const { reducer: i18nReducer, actions: i18nActions } = state
