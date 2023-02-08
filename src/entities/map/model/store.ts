import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFetchMapInfoParams, mapApi } from 'shared/api/map'
import { OLCoordinate, MapModeType, OLMap } from 'shared/model'
import { errorHelper } from 'shared/lib'

import { IMapState } from 'entities/map/model/types'

export const getLayerList = createAsyncThunk('map/getLayerList', () =>
	mapApi.fetchLayerList()
)

export const getMapInfo = createAsyncThunk(
	'map/getMapInfo',
	(params: IFetchMapInfoParams) => mapApi.fetchMapInfo(params)
)

const initialState: IMapState = {
	map: null,
	layerList: [],
	activeLayerIdList: [],
	currentZoom: undefined,
	currentCoords: null,
	mapMode: 'view',
	isLoading: false,
	error: null,
	errorOnFetchInfoData: null,
	isLoadingInfoData: false,
	infoData: null,
	isOpenRightSidebar: false,
	isOpenLeftSidebar: true,
}

const store = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setMap(state, action: PayloadAction<OLMap | null>) {
			state.map = action.payload
		},
		setCurrentZoom(state, action: PayloadAction<number>) {
			state.currentZoom = action.payload
		},
		setCurrentCoords(state, action: PayloadAction<OLCoordinate | null>) {
			state.currentCoords = action.payload
		},
		setMapMode(state, action: PayloadAction<MapModeType>) {
			state.mapMode = action.payload
		},
		setActiveLayerIdList(state, action: PayloadAction<number[]>) {
			state.activeLayerIdList = action.payload
		},
		setInfoData(state, action: PayloadAction<any>) {
			state.infoData = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setIsOpenRightSidebar(state, action: PayloadAction<boolean>) {
			state.isOpenRightSidebar = action.payload
		},
		setIsOpenLeftSidebar(state, action: PayloadAction<boolean>) {
			state.isOpenLeftSidebar = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getLayerList.fulfilled, (state, action) => {
			state.isLoading = false
			state.layerList = action.payload
		})
		builder.addCase(getLayerList.rejected, (state, action) => {
			state.isLoading = false
			state.error = errorHelper.errorToString(action.error.message)
		})
		builder.addCase(getLayerList.pending, (state) => {
			state.error = null
			state.isLoading = true
		})
		builder.addCase(getMapInfo.fulfilled, (state, action) => {
			state.isLoadingInfoData = false
			state.infoData = action.payload
		})
		builder.addCase(getMapInfo.rejected, (state, action) => {
			state.isLoadingInfoData = false
			state.errorOnFetchInfoData = errorHelper.errorToString(
				action.error.message
			)
		})
		builder.addCase(getMapInfo.pending, (state) => {
			state.errorOnFetchInfoData = null
			state.isLoadingInfoData = true
		})
	},
})

export const { reducer: mapReducer, actions: mapActions } = store
