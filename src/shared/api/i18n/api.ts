import { axiosInstance } from '../base'
import { errorHelper, dataHelper } from 'shared/lib/helpers'
import { I18nLng, I18nLocale } from 'shared/model'

export const fetchAppLocales = (): Promise<{
	localeList: I18nLocale[]
	lngList: I18nLng[]
	currentLng: string | null
}> => {
	return axiosInstance
		.get('util-service/LocaleStringList')
		.then((response) => response.data)
		.then((response) => response.LocaleStringList)
		.then((response) => {
			errorHelper.responseErrorHandler(response)

			const localeList = dataHelper.valueToArray(response?.row)
			const lngList = dataHelper.valueToArray(response?.aLng?.lng)
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
