import { I18nLng, I18nLocale } from 'shared/model'

export interface I18nState {
	localeList: I18nLocale[]
	lngList: I18nLng[]
	currentLng: string | null
}
