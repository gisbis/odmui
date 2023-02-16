import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'
import type { IUserProperties } from './types'

export const fetchUserProps = (params: {
	idUser: number
}): Promise<IUserProperties> =>
	axiosInstance
		.get('user-service/admin/UserProperties', {
			params: requestLib.encodePostParams(params),
		})
		.then((response) => response.data)
		.then((response) => response?.UserProperties)
		.then((response) => {
			requestLib.throwResponseError(response)
			return response?.User
		})
		.then((response) => {
			let userProps: IUserProperties = { ...response }
			let contacts = response.contactsUser.UserContact

			userProps.contactsUser = convertersLib.anyToArray(contacts)
			return userProps
		})
		.catch((e) => {
			throw e
		})
