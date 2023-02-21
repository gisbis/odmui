import { useEffect } from 'react'
import { useAppSelector } from 'shared/model'
import { mapSelectors, useMapContext } from 'widgets/map'

export const ObserveCrfValues = () => {
	const { map } = useMapContext()
	const crfClassifierValues = useAppSelector(
		mapSelectors.selectCRFClassifierValues
	)

	const currentZoom = useAppSelector(mapSelectors.selectCurrentZoom)

	useEffect(() => {
		if (!map) {
			return
		}

		console.log('effect ObserveCrfValues')
	}, [map, crfClassifierValues, currentZoom])

	return null
}
