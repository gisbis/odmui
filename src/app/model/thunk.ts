import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAppLocales } from 'shared/i18n/api'
import { fetchUserInfo } from 'entities/user/api'

import { i18nActions } from 'shared/i18n'
import { userActions } from 'entities/user'

export const getAppData = createAsyncThunk(
	'app/getAppData',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const [localeData, userData] = await Promise.all([
				fetchAppLocales(),
				fetchUserInfo(),
			])

			dispatch(i18nActions.setCurrentLng(localeData.currentLng))
			dispatch(i18nActions.setLngList(localeData.lngList))
			dispatch(i18nActions.setLocaleList(localeData.localeList))

			if (!userData?.user?.uid) {
				dispatch(userActions.setUser(null))
				dispatch(userActions.setSessId(null))
				return
			}

			dispatch(userActions.setUser(userData.user))
			dispatch(userActions.setSessId(userData.sessId))
		} catch (e) {
			rejectWithValue(e)
		}
	}
)
