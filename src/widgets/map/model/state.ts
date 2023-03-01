import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatus } from 'shared/model'
import { convertersLib } from 'shared/lib'

import type { IClassifierValue } from 'shared/api/classifier'
import type {
	IMapInfoRowData,
	LeftSidebarContentType,
	MapModeType,
	RightSidebarContentType,
} from 'widgets/map/api'

import { getMapInfo } from './thunk'

import type { Coordinate } from 'ol/coordinate'
import type { ILayer } from 'shared/api/user'

export interface ICRFClassifierValue extends IClassifierValue {
	nameGroup: string
	idLayer: number
	crfCID: number
	crfLF: string
}

export interface IInfoMapGeom {
	sys: number
	idLayer: number
	idSelect: number
	geom: string
}

interface IMapState {
	defaultBaseLayerId: string
	activeIdLayerList: number[]
	crfUserLayerList: ILayer[]
	crfClassifierValues: ICRFClassifierValue[]
	isOpenCrfFilterSearch: boolean
	currentZoom?: number
	currentCoords?: Coordinate
	currenMapModeType: MapModeType
	isOpenLeftSidebar: boolean
	isOpenRightSidebar: boolean
	leftSidebarContentType: LeftSidebarContentType
	rightSidebarContentType: RightSidebarContentType
	mapInfoData: IMapInfoRowData[] | null
	mapOnLoadEnd: boolean
	infoMapGeoms: IInfoMapGeom[] | null
	status: RequestStatus
	errorMsg: string | null
}

const initialState: IMapState = {
	defaultBaseLayerId: 'osm',
	activeIdLayerList: [],
	crfUserLayerList: [],
	crfClassifierValues: [],
	isOpenCrfFilterSearch: false,
	currenMapModeType: undefined,
	currentCoords: undefined,
	currentZoom: undefined,
	isOpenLeftSidebar: true,
	isOpenRightSidebar: false,
	leftSidebarContentType: 'home-screen',
	rightSidebarContentType: 'layer-switcher',
	mapOnLoadEnd: false,
	mapInfoData: null,
	infoMapGeoms: null,
	errorMsg: null,
	status: undefined,
}

const state = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setDefaultBaseLayerId(state, action: PayloadAction<string>) {
			state.defaultBaseLayerId = action.payload
		},
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
		setCRFUserLayerList(state, action: PayloadAction<ILayer[]>) {
			state.crfUserLayerList = action.payload
		},
		setCRFClassifierValues(
			state,
			action: PayloadAction<ICRFClassifierValue[]>
		) {
			state.crfClassifierValues = action.payload
		},
		setIsOpenCRFFilterSearch(state, action: PayloadAction<boolean>) {
			state.isOpenCrfFilterSearch = action.payload
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
		setMapOnLoadEnd(state, action: PayloadAction<boolean>) {
			state.mapOnLoadEnd = action.payload
		},
		setMapinfoData(state, action: PayloadAction<IMapInfoRowData[] | null>) {
			state.mapInfoData = action.payload
		},
		setInfoMapGeoms(state, action: PayloadAction<IInfoMapGeom[] | null>) {
			state.infoMapGeoms = action.payload
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
