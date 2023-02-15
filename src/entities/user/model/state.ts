import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { IUser, IUserProperties, ILayer, ISetting } from './types'
import { getUserInfo, getUserData } from './thunk'

import { RequestStatus } from 'shared/model'
import { convertersLib } from 'shared/lib'

interface IUserState {
	user: IUser | null
	userProperties: IUserProperties | null
	sessId: string | null
	layerList: ILayer[]
	settingList: ISetting[]
	status: RequestStatus
	errorMsg: string | null
}

const initialState: IUserState = {
	user: null,
	userProperties: null,
	sessId: null,
	layerList: [],
	settingList: [],
	status: undefined,
	errorMsg: null,
}

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser | null>) {
			state.user = action.payload
		},
		setUserProps(state, action: PayloadAction<IUserProperties | null>) {
			state.userProperties = action.payload
		},
		setSessId(state, action: PayloadAction<string | null>) {
			state.sessId = action.payload
		},
		setLayerList(state, action: PayloadAction<ILayer[]>) {
			state.layerList = action.payload
		},
		setSettingList(state, action: PayloadAction<ISetting[]>) {
			state.settingList = action.payload
		},
		setErrorMsg(state, action: PayloadAction<string | null>) {
			state.errorMsg = action.payload
		},
		setStatus(state, action: PayloadAction<RequestStatus>) {
			state.status = action.payload
		},
		resetState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getUserInfo.pending, (state, action) => {
			state.errorMsg = null
			state.status = 'loading'
		})
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			state.status = 'success'

			const { user, sessId } = action.payload
			state.user = user
			state.sessId = sessId
		})
		builder.addCase(getUserInfo.rejected, (state, action) => {
			state.status = 'error'
			state.errorMsg = convertersLib.errorToString(action.error.message)

			state.user = null
			state.sessId = null
		})
		builder.addCase(getUserData.pending, (state, action) => {
			state.errorMsg = null
			state.status = 'loading'
		})
		builder.addCase(getUserData.fulfilled, (state, action) => {
			state.status = 'success'
			const [layerList, settingList, userProps] = action.payload

			state.settingList = settingList
			state.layerList = layerList
			state.userProperties = userProps
		})
		builder.addCase(getUserData.rejected, (state, action) => {
			state.status = 'error'
			state.errorMsg = convertersLib.errorToString(action.error.message)

			state.settingList = []
			state.layerList = []
			state.userProperties = null
		})
	},
})

export const { reducer: userReducer, actions: userActions } = slice
