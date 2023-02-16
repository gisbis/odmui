import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { ILayer, ISetting, IUser, IUserProperties } from 'shared/api/user'
import type { RequestStatus } from 'shared/model'

import {
	getLayerList,
	getSettingList,
	getUserInfo,
	getUserProps,
} from './thunk'

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
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			const { user, sessId } = action.payload
			if (!user?.uid) {
				state.user = null
				state.sessId = null
				return
			}

			state.user = user
			state.sessId = sessId
		})
		builder.addCase(getUserProps.fulfilled, (state, action) => {
			state.userProperties = action.payload
		})
		builder.addCase(getLayerList.fulfilled, (state, action) => {
			state.layerList = action.payload
		})
		builder.addCase(getSettingList.fulfilled, (state, action) => {
			state.settingList = action.payload
		})
	},
})

export const { reducer: userReducer, actions: userActions } = slice
