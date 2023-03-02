import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'

import type { IUser } from './types'

export const fetchUserInfo = (): Promise<{
	user: IUser
	sessId: string | null
}> =>
	axiosInstance
		.get('user-service/UserInfo')
		.then((response) => {
			const sessionId = response.headers['jsessionid'] || null
			return { response, sessionId }
		})
		.then((response) => {
			const userData = response.response.data.UserInfo
			requestLib.throwResponseError(userData)

			const user = userData as IUser
			user.groupId = convertersLib.anyToArray(userData?.groupId)
			user.userRight = convertersLib.anyToArray(userData?.userRight?.row)
			user.boundBox = userData?.boundBox?.Box

			return { user, sessId: response?.sessionId || null }
		})
		.catch((e) => {
			throw e
		})
