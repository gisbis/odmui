import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMapInfo, IFetchMapInfoParams } from '../api'

export const getMapInfo = createAsyncThunk(
	'mapInfo/getMapInfo',
	(params: IFetchMapInfoParams) => fetchMapInfo(params)
)
