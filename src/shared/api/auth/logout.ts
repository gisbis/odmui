import { axiosInstance } from 'shared/api'
import { requestLib } from 'shared/lib'

export const logout = (): Promise<boolean> => {
	return axiosInstance
		.post('Logout')
		.then((response) => response.data)
		.then((response) => {
			requestLib.throwResponseError(response)
			return !!response?.result
		})
		.catch((e) => {
			throw e
		})
}
