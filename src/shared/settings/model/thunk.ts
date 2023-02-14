import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchAppSettings } from '../api'

export const getSettings = createAsyncThunk('appSettings/getAppSettings', () =>
	fetchAppSettings()
)
