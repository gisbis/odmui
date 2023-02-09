import { axiosHelper, dataHelper, errorHelper } from 'shared/lib/helpers'
import { ILayer } from 'shared/model'
import { axiosInstance } from 'shared/api/base'

import { IFetchMapInfoParams, IMapInfoRowData } from './types'

export const fetchMapInfo = (
	params: IFetchMapInfoParams
): Promise<IMapInfoRowData[]> => {
	return axiosInstance
		.post('MapInfo', axiosHelper.axiosEncodeParams(params))
		.then((response) => response.data)
		.then((response) => response?.MapInfo)
		.then((response) => {
			errorHelper.responseErrorHandler(response)
			return dataHelper.valueToArray(response?.row)
		})
		.catch((e: unknown) => {
			throw e
		})
}

export const fetchLayerList = (): Promise<ILayer[]> => {
	return axiosInstance
		.get('LayerUserList')
		.then((response) => response.data)
		.then((response) => response?.LayerUserList)
		.then((response) => {
			errorHelper.responseErrorHandler(response)
			return dataHelper.valueToArray(response?.Layers?.row)
		})
		.catch((e) => {
			throw e
		})
}
