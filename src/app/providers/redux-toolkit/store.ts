import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { appReducer } from 'shared/model'
import { i18nReducer } from 'shared/i18n/model'
import { userReducer } from 'entities/user/model'
import { mapReducer } from 'entities/map/model'

export const store = configureStore({
	reducer: {
		app: appReducer,
		user: userReducer,
		map: mapReducer,
		i18n: i18nReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
