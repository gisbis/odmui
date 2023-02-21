import { useEffect, useMemo } from 'react'
import { useAppSelector } from 'shared/model'
import { mapLib, useMapContext, mapSelectors } from 'widgets/map'

export const ObserveActiveIdLayers = () => {
	const { map } = useMapContext()

	const activeIdLayerList = useAppSelector(mapSelectors.selectActiveIdLayerList)

	useEffect(() => {
		if (!map) {
			return
		}

		const overlayLayerList = mapLib
			.getMapOverlayLyers({ map })
			.filter((i) => !i.get('autoload'))

		overlayLayerList.forEach(function (layer) {
			const idLayer = layer.get('idLayer')

			const layerInActiveList = activeIdLayerList
				.map((i) => +i)
				.includes(+idLayer)

			layer.setVisible(layerInActiveList)
		})
	}, [activeIdLayerList, map])

	return null
}
