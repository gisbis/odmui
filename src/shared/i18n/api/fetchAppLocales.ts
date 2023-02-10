import { axiosInstance } from 'shared/api'
import { convertersLib, requestLib } from 'shared/lib'

import type { I18nLocale, I18nLng } from '../model'

export interface IFetchAppLocalesResponse {
	localeList: I18nLocale[]
	lngList: I18nLng[]
	currentLng: string | null
}

export const fetchAppLocales = (): Promise<IFetchAppLocalesResponse> => {
	return axiosInstance
		.get('util-service/LocaleStringList')
		.then((response) => response.data)
		.then((response) => response.LocaleStringList)
		.then((response) => {
			requestLib.encodePostParams(response)

			const localeList = convertersLib.anyToArray(response.row)
			const lngList = convertersLib.anyToArray(response?.aLng?.lng)

			const currentLng = response.language || null

			return {
				localeList,
				lngList,
				currentLng,
			}
		})
		.catch((e) => {
			throw e
		})
}
