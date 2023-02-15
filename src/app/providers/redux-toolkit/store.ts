import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { appReducer } from '../../model'
import { i18nReducer } from 'shared/i18n'
import { userReducer } from 'entities/user'
import { selectReducer } from 'entities/select'
import { mapReducer } from 'widgets/map'

export const store = configureStore({
	reducer: {
		app: appReducer,
		i18n: i18nReducer,
		user: userReducer,
		select: selectReducer,
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
