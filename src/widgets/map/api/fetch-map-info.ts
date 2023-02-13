import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'
import { IMapInfoRowData } from '../model'

export interface IFetchMapInfoParams {
	layers: string
	lat: number
	lng: number
	zoom?: number
	year?: number
}

export const fetchMapInfo = (
	params: IFetchMapInfoParams
): Promise<IMapInfoRowData[]> =>
	axiosInstance
		.post('MapInfo', requestLib.encodePostParams(params))
		.then((response) => response.data)
		.then((response) => response.MapInfo)
		.then((response) => {
			requestLib.throwResponseError(response)

			return convertersLib.anyToArray(response?.row)
		})
		.catch((e) => {
			throw e
		})
