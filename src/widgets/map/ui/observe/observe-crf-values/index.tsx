import { useEffect, useState } from 'react'
import { useAppSelector } from 'shared/model'
import { mapLib, mapSelectors, useMapContext } from 'widgets/map'
import type { IGroupedCrfData } from 'widgets/map/lib'

export const ObserveCrfValues = () => {
	const { map } = useMapContext()
	const [crfData, setCrfData] = useState<IGroupedCrfData[]>([])

	const crfClassifierValues = useAppSelector(
		mapSelectors.selectCRFClassifierValues
	)

	const currentZoom = useAppSelector(mapSelectors.selectCurrentZoom)

	useEffect(() => {
		const crfData = mapLib.groupCrfValues(crfClassifierValues)
		setCrfData(crfData)

		return () => {
			setCrfData([])
		}
	}, [crfClassifierValues])

	useEffect(() => {
		if (!map || !currentZoom) {
			return
		}

		const activeOverlayLayers = mapLib.getMapActiveOverlayLayers({
			map,
			zoom: currentZoom,
		})

		activeOverlayLayers.forEach((lyr) => {
			const idLayer = lyr.get('idLayer')

			const crfValue = crfData.find(
				(i) => String(i.idLayer) === String(idLayer)
			)

			const source = lyr.getSource()

			if (!source) {
				return
			}

			// @ts-ignore
			const params = source.getParams()

			if (!crfValue && !params.hasOwnProperty('CF')) {
				return
			}

			if (!crfValue) {
				delete params.CF
				source.refresh()
				return
			}

			let crfStr = ''

			crfValue.items.forEach((i) => {
				const { keyValue, items } = i

				if (!items.length) {
					return
				}

				crfStr += `${keyValue}: ${items
					.map((x: { key: any }) => x.key)
					.join(',')};`
			})

			if (!crfStr.length) {
				return
			}

			params.CF = crfStr
			source.refresh()
		})
	}, [map, currentZoom, crfData])

	return null
}
