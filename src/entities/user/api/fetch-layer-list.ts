import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'

import type { ILayer } from '../model'

export const fetchLayerList = (): Promise<ILayer[]> =>
	axiosInstance
		.get('LayerUserList')
		.then((response) => response.data)
		.then((response) => response?.LayerUserList)
		.then((response) => {
			requestLib.throwResponseError(response)
			return convertersLib.anyToArray(response?.Layers?.row)
		})
		.catch((e) => {
			throw e
		})
