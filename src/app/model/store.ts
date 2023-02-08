import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { i18nReducer } from 'entities/i18n/model'
import { mapReducer } from 'entities/map/model/store'
import { appReducer } from 'shared/model'

export const store = configureStore({
	reducer: {
		app: appReducer,
		i18n: i18nReducer,
		map: mapReducer,
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
