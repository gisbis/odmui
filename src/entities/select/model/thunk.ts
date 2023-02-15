import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSelectList } from '../api'

export const getSelectList = createAsyncThunk('select/getSelectList', () =>
	fetchSelectList()
)
