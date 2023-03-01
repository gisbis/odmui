import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'

export interface IFetchGeomParams {
	idLayer: number
	syss: number
}

export interface IFetchGeom {
	geom: string
	sys: number
}

export const fetchGeom = (params: IFetchGeomParams): Promise<IFetchGeom[]> =>
	axiosInstance
		.post('GetGeometry', requestLib.encodePostParams(params))
		.then((response) => response.data)
		.then((response) => response.GetGeometry)
		.then((response) => {
			requestLib.throwResponseError(response)

			return convertersLib.anyToArray(response.row)
		})
		.catch((e) => {
			throw e
		})
