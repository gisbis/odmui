import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLayerList, fetchSelectList } from '../api'

export const getLayerList = createAsyncThunk('select/getLayerList', () =>
	fetchLayerList()
)
export const getSelectList = createAsyncThunk('select/getSelectList', () =>
	fetchSelectList()
)
