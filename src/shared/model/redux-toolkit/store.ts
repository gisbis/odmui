import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAppState } from 'shared/model/redux-toolkit/types'

const initialState: IAppState = {
	error: null,
	isLoading: false,
}

const store = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
	},
})

export const { reducer: appReducer, actions: appActions } = store
