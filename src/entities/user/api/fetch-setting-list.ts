import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'

import type { ISetting } from '../model'

export const fetchSettingList = (): Promise<ISetting[]> =>
	axiosInstance
		.get('util-service/Setting')
		.then((response) => response.data)
		.then((response) => response.Setting)
		.then((response) => {
			requestLib.throwResponseError(response)
			return convertersLib.anyToArray(response?.Settings?.Setting)
		})
		.catch((e) => {
			throw e
		})
