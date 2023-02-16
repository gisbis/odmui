import { createAsyncThunk } from '@reduxjs/toolkit'

import { authApi, userApi } from 'shared/api'
import type { ILoginParams } from 'shared/api/auth'

import { userActions } from 'entities/user'

export const login = createAsyncThunk(
	'user/login',
	async (params: ILoginParams, { dispatch }) => {
		try {
			await authApi.login(params)
			const { user, sessId } = await userApi.fetchUserInfo()

			dispatch(userActions.setUser(user))
			dispatch(userActions.setSessId(sessId))
		} catch (e) {
			throw e
		}
	}
)

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { dispatch }) => {
		try {
			await authApi.logout()
			const { user } = await userApi.fetchUserInfo()

			if (!!user?.uid) {
				return
			}

			dispatch(userActions.setUser(null))
			dispatch(userActions.setSessId(null))
		} catch (e) {
			throw e
		}
	}
)

export const getUserInfo = createAsyncThunk('user/getUserInfo', () =>
	userApi.fetchUserInfo()
)

export const getUserProps = createAsyncThunk(
	'user/getUserProps',
	(params: { idUser: number }) => userApi.fetchUserProps(params)
)
export const getLayerList = createAsyncThunk('user/getLayerList', () =>
	userApi.fetchLayerList()
)
export const getSettingList = createAsyncThunk('user/getSettingList', () =>
	userApi.fetchSettingList()
)
