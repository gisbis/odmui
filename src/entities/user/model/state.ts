import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUserProperties } from './types'
import { getUserInfo, getUserProps } from './thunk'

interface IUserState {
	user: IUser | null
	userProperties: IUserProperties | null
	sessId: string | null
}

const initialState: IUserState = {
	user: null,
	userProperties: null,
	sessId: null,
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
	},
	extraReducers: (builder) => {
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			state.user = action.payload.user
			state.sessId = action.payload.sessId
		})
		builder.addCase(getUserProps.fulfilled, (state, action) => {
			state.userProperties = action.payload
		})
	},
})

export const { reducer: userReducer, actions: userActions } = slice
