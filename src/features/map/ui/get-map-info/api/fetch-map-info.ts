import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'
import { IMapInfoRow } from 'entities/map'

export interface IFetchMapInfoParams {
	layers: string
	lat: number
	lng: number
	zoom?: number
	year?: number
}

export const fetchMapInfo = (
	params: IFetchMapInfoParams
): Promise<IMapInfoRow[]> =>
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
