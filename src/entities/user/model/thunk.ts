import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserInfo, fetchUserProps } from '../api'

export const getUserInfo = createAsyncThunk('user/getUserInfo', () =>
	fetchUserInfo()
)
export const getUserProps = createAsyncThunk(
	'user/getUserProps',
	(params: { idUser: number }) => fetchUserProps(params)
)
