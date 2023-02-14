import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatus } from 'shared/model'
import { convertersLib } from 'shared/lib'

import type {
	IMapInfoRowData,
	LeftSidebarContentType,
	MapModeType,
	RightSidebarContentType,
} from '../model'

import { getMapInfo } from '../model'

import { Coordinate } from 'ol/coordinate'

interface IMapState {
	activeIdLayerList: number[]
	currentZoom?: number
	currentCoords?: Coordinate
	currenMapModeType: MapModeType
	isOpenLeftSidebar: boolean
	isOpenRightSidebar: boolean
	leftSidebarContentType: LeftSidebarContentType
	rightSidebarContentType: RightSidebarContentType
	mapInfoData: IMapInfoRowData[] | null
	status: RequestStatus
	errorMsg: string | null
}

const initialState: IMapState = {
	activeIdLayerList: [],
	currenMapModeType: undefined,
	currentCoords: undefined,
	currentZoom: undefined,
	isOpenLeftSidebar: true,
	isOpenRightSidebar: false,
	leftSidebarContentType: 'home-screen',
	rightSidebarContentType: 'layer-switcher',
	mapInfoData: null,
	errorMsg: null,
	status: undefined,
}

const state = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setCurrentZoom(state, action: PayloadAction<number | undefined>) {
			state.currentZoom = action.payload
		},
		setCurrentCoords(state, action: PayloadAction<Coordinate | undefined>) {
			state.currentCoords = action.payload
		},
		setCurrentMapModeType(state, action: PayloadAction<MapModeType>) {
			state.currenMapModeType = action.payload
		},
		setActiveIdLayerList(state, action: PayloadAction<number[]>) {
			state.activeIdLayerList = action.payload
		},
		setIsOpenLeftSidebar(state, action: PayloadAction<boolean>) {
			state.isOpenLeftSidebar = action.payload
		},
		setIsOpenRightSidebar(state, action: PayloadAction<boolean>) {
			state.isOpenRightSidebar = action.payload
		},
		setLeftSidebarContentType(
			state,
			action: PayloadAction<LeftSidebarContentType>
		) {
			state.leftSidebarContentType = action.payload
		},
		setRightSidebarContentType(
			state,
			action: PayloadAction<RightSidebarContentType>
		) {
			state.rightSidebarContentType = action.payload
		},
		setMapinfoData(state, action: PayloadAction<IMapInfoRowData[] | null>) {
			state.mapInfoData = action.payload
		},
		setErrorMsg(state, action: PayloadAction<string | null>) {
			state.errorMsg = action.payload
		},
		setStatus(state, action: PayloadAction<RequestStatus>) {
			state.status = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMapInfo.fulfilled, (state, action) => {
			state.status = 'success'
			state.mapInfoData = action.payload
		})
		builder.addCase(getMapInfo.rejected, (state, action) => {
			state.errorMsg = convertersLib.errorToString(action.payload)
			state.status = 'error'
		})
		builder.addCase(getMapInfo.pending, (state) => {
			state.status = 'loading'
			state.errorMsg = null
		})
	},
})

export const { reducer: mapReducer, actions: mapActions } = state
