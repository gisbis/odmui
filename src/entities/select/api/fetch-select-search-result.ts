import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'
import type { ISelectRecord } from '../model'

export interface IFetchSelectSearchResultParams {
	Select: string
	idSelectMain?: string
	page?: number
	id?: string
}

export interface ISelectSearchResultData {
	selectKey: string
	recCount?: number
	searchResult: ISelectRecord[]
}

export const fetchSelectSearchResult = (
	params: IFetchSelectSearchResultParams
): Promise<ISelectSearchResultData> => {
	return axiosInstance
		.post('SelectSearchResult', requestLib.encodePostParams(params))
		.then((response) => response.data)
		.then((response) => response.SelectSearchResult)
		.then((response) => {
			requestLib.throwResponseError(response)

			const searchResult = convertersLib.anyToArray(response?.row)

			searchResult.forEach((record) => {
				record.doclist = convertersLib.anyToArray(record?.doclist?.rowDoc)
			})

			const data: ISelectSearchResultData = {
				selectKey: params.Select,
				searchResult,
			}

			if (Object.keys(response).includes('recCount')) {
				data.recCount = response.recCount
			}

			return data
		})
		.catch((e) => {
			throw e
		})
}
