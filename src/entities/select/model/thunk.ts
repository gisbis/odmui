import { createAsyncThunk } from '@reduxjs/toolkit'
import { selectApi } from 'shared/api'

export const getSelectList = createAsyncThunk('select/getSelectList', () =>
	selectApi.fetchSelectList()
)
