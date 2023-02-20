import { axiosInstance } from 'shared/api/instance'
import { convertersLib, requestLib } from 'shared/lib'

import type { IClassifierValue } from './types'

export interface IFetchClassifierValuesParams {
	classifier: string
	valueContent?: string
	key?: string
	all?: number
}

export const fetchClassifierValues = (
	params: IFetchClassifierValuesParams
): Promise<IClassifierValue[]> => {
	return axiosInstance
		.post('GetClassifierValues', requestLib.encodePostParams(params))
		.then((response) => response.data)
		.then((response) => response.ClassifierValues)
		.then((response) => {
			requestLib.throwResponseError(response)
			return convertersLib.anyToArray(response.row)
		})
		.catch((e) => {
			throw e
		})
}
