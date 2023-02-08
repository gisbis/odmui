import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { i18nApi } from 'shared/api/i18n'
import { I18nState } from 'entities/i18n/model/types'
import { I18nLng, I18nLocale } from 'shared/model'

const initialState: I18nState = {
	localeList: [],
	lngList: [],
	currentLng: null,
}

export const getLocaleList = createAsyncThunk('i18n/getLocaleList', () =>
	i18nApi.fetchAppLocales()
)

const store = createSlice({
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

export const { reducer: i18nReducer, actions: i18nActions } = store
