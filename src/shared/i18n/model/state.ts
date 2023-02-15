import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { I18nLng, I18nLocale } from './types'

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
		setCurrentLng(state, action: PayloadAction<string | null>) {
			state.currentLng = action.payload
		},
	},
})

export const { reducer: i18nReducer, actions: i18nActions } = state
