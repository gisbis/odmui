import { axiosInstance } from 'shared/api'
import { requestLib } from 'shared/lib'

export interface ILoginParams {
	username: string
	password?: string
	rememberMe?: boolean
}

export const login = (params: ILoginParams): Promise<boolean> => {
	return axiosInstance
		.post('Login', requestLib.encodePostParams(params))
		.then((response) => response.data)
		.then((response) => response.Login)
		.then((response) => {
			requestLib.throwResponseError(response)

			return !!response?.success
		})
		.catch((e) => {
			throw e
		})
}
