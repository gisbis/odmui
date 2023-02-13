import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchAppSettings } from '../api'

export const getAppSettings = createAsyncThunk(
	'appSettings/getAppSettings',
	() => fetchAppSettings()
)
