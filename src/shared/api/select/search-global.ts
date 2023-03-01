import { axiosInstance } from 'shared/api/instance'
import { convertersLib, requestLib } from 'shared/lib'
import type { ISearchGlobalValue } from './types'

export interface ISearchGlobalParams {
	value: string
	onMap: 0 | 1
}

export const searchGlobal = (
	params: ISearchGlobalParams
): Promise<ISearchGlobalValue[]> =>
	axiosInstance
		.post('SearchGloabal', requestLib.encodePostParams(params))
		.then((response) => response.data)
		.then((response) => response.SearchGloabal)
		.then((response) => {
			requestLib.throwResponseError(response)

			return convertersLib.anyToArray(response?.globalSearch?.row)
		})
		.catch((e) => {
			throw e
		})
