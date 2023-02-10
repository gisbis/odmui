import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLayerList } from '../api'

export interface IFetchMapInfoParams {}

export const getLayerList = createAsyncThunk('map/getLayerList', () =>
	fetchLayerList()
)
