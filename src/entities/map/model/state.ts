import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RequestStatus } from 'shared/model'

import type { ILayer, MapModeType } from './types'
import { getLayerList } from './thunk'

import type { Map } from 'ol'
import { Coordinate } from 'ol/coordinate'
import { convertersLib } from 'shared/lib'

interface IMapState {
	layerList: ILayer[]
	activeIdLayerList: number[]
	currentZoom?: number
	currentCoords?: Coordinate
	currenMapModeType: MapModeType
	isOpenLeftSidebar: boolean
	isOpenRightsSidebar: boolean
	leftSidebarContent?: JSX.Element
	rightSidebarContent?: JSX.Element
	status: RequestStatus
	errorMsg: string | null
}

const initialState: IMapState = {
	layerList: [],
	activeIdLayerList: [],
	currenMapModeType: undefined,
	currentCoords: undefined,
	currentZoom: undefined,
	isOpenLeftSidebar: true,
	isOpenRightsSidebar: true,
	leftSidebarContent: undefined,
	rightSidebarContent: undefined,
	errorMsg: null,
	status: undefined,
}

const state = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setLayerList(state, action: PayloadAction<ILayer[]>) {
			state.layerList = action.payload
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
		setErrorMsg(state, action: PayloadAction<string | null>) {
			state.errorMsg = action.payload
		},
		setStatus(state, action: PayloadAction<RequestStatus>) {
			state.status = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getLayerList.fulfilled, (state, action) => {
			state.status = 'success'
			state.layerList = action.payload
		})
		builder.addCase(getLayerList.rejected, (state, action) => {
			state.status = 'error'
			state.errorMsg = convertersLib.errorToString(action.error)
		})
		builder.addCase(getLayerList.pending, (state) => {
			state.errorMsg = null
			state.status = 'loading'
		})
	},
})

export const { reducer: mapReducer, actions: mapActions } = state
