import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'

import type { ILayer } from './types'

export const fetchLayerList = (): Promise<ILayer[]> =>
	axiosInstance
		.get('LayerUserList')
		.then((response) => response.data)
		.then((response) => response?.LayerUserList)
		.then((response) => {
			requestLib.throwResponseError(response)

			const layerList = convertersLib.anyToArray(response?.Layers?.row)

			layerList.forEach((layer) => {
				if (layer?.classifierFilterRules?.cfr) {
					layer.classifierFilterRules = convertersLib.anyToArray(
						layer.classifierFilterRules.cfr
					)
				}
			})

			return layerList
		})
		.catch((e) => {
			throw e
		})
