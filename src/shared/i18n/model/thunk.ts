import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAppLocales } from '../api'

export const getLocaleList = createAsyncThunk('i18n/getLocaleList', () =>
	fetchAppLocales()
)
