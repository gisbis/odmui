import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { I18nLng, I18nLocale } from './types'
import { getI18nData } from './thunk'
import { RequestStatus } from 'shared/model'
import { convertersLib } from 'shared/lib'

interface I18nState {
	localeList: I18nLocale[]
	lngList: I18nLng[]
	currentLng: string | null
	status: RequestStatus
	errorMsg: string | null
}

const initialState: I18nState = {
	localeList: [],
	lngList: [],
	currentLng: null,
	status: undefined,
	errorMsg: null,
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
	extraReducers: (builder) => {
		builder.addCase(getI18nData.fulfilled, (state, action) => {
			const { localeList, lngList, currentLng } = action.payload

			state.lngList = lngList
			state.currentLng = currentLng
			state.localeList = localeList

			state.status = 'success'
		})
		builder.addCase(getI18nData.pending, (state) => {
			state.status = 'loading'
			state.errorMsg = null
		})
		builder.addCase(getI18nData.rejected, (state, action) => {
			state.status = 'error'
			state.errorMsg = convertersLib.errorToString(action.error.message)
		})
	},
})

export const { reducer: i18nReducer, actions: i18nActions } = state
