import { i18nSelectors } from 'shared/i18n'

import { useAppSelector } from 'shared/model'
import { useCallback } from 'react'

export const useTranslate = () => {
	const locales = useAppSelector(i18nSelectors.selectLocales)

	const translate = useCallback(
		(key: string): string =>
			locales.find(
				(i) => String(i.key).toLowerCase() === String(key).toLowerCase()
			)?.value || key,
		[locales]
	)

	return { translate }
}
