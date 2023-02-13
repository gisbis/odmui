import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'

import type { IAppSetting } from '../model'

export const fetchAppSettings = (): Promise<IAppSetting[]> =>
	axiosInstance
		.get('util-service/Setting')
		.then((response) => response.data)
		.then((response) => response.Setting)
		.then((response) => {
			requestLib.throwResponseError(response)
			return convertersLib.anyToArray(response?.Settings?.Setting)
		})
		.catch((e) => {
			throw new Error(e.message)
		})
