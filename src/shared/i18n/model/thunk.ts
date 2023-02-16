import { createAsyncThunk } from '@reduxjs/toolkit'
import { i18nApi } from 'shared/i18n'

export const getI18nData = createAsyncThunk('i18n/getI18nData', () =>
	i18nApi.fetchAppLocales()
)
