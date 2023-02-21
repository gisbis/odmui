import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'
import { mapLib, mapSelectors, useMapContext, mapActions } from 'widgets/map'

export const ObserveCrfLayers = () => {
	const { map } = useMapContext()
	const dispatch = useAppDispatch()

	const userLayerList = useAppSelector(userSelectors.selectUserLayerList)
	const activeIdLayerList = useAppSelector(mapSelectors.selectActiveIdLayerList)
	const currentZoom = useAppSelector(mapSelectors.selectCurrentZoom)

	useEffect(() => {
		if (!map || !currentZoom) {
			return
		}

		setTimeout(() => {
			const activeLayers = mapLib.getMapActiveOverlayLayers({
				map,
				zoom: currentZoom,
			})

			if (!activeLayers.length) {
				dispatch(mapActions.setCRFUserLayerList([]))
				return
			}

			const crfUserLayerList = userLayerList.filter((i) => {
				const layerOnActiveLayerList = !!activeLayers.find(
					(x) => +x.get('idLayer') === +i.id
				)

				return layerOnActiveLayerList && !!i?.classifierFilterRules?.length
			})

			dispatch(mapActions.setCRFUserLayerList(crfUserLayerList))
		}, 0)
	}, [map, currentZoom, activeIdLayerList, userLayerList])

	return null
}
