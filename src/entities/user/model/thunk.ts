import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	fetchUserInfo,
	fetchUserProps,
	fetchLayerList,
	fetchSettingList,
} from '../api'
import { ILayer, ISetting, IUserProperties } from 'entities/user/model/types'

export const getUserInfo = createAsyncThunk('user/getUserInfo', () =>
	fetchUserInfo()
)

export const getUserData = createAsyncThunk(
	'user/getUserData',
	(params: {
		idUser: number
	}): Promise<[ILayer[], ISetting[], IUserProperties]> =>
		Promise.all([fetchLayerList(), fetchSettingList(), fetchUserProps(params)])
)
