import { useEffect, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'
import { mapLib, mapSelectors, useMapContext, mapActions } from 'widgets/map'

export const ObserveCrfLayerList = () => {
	const { map } = useMapContext()
	const dispatch = useAppDispatch()

	const userLayerList = useAppSelector(userSelectors.selectUserLayerList)
	const activeIdLayerList = useAppSelector(mapSelectors.selectActiveIdLayerList)
	const currentZoom = useAppSelector(mapSelectors.selectCurrentZoom)

	const activeOverlayLayerList = useMemo(() => {
		if (!map || currentZoom === undefined) {
			return []
		}

		return mapLib.getMapActiveOverlayLayers({
			map,
			zoom: currentZoom,
		})
	}, [activeIdLayerList, currentZoom, map])

	const crfUserLayerList = useMemo(() => {
		if (!activeOverlayLayerList.length || !userLayerList.length) {
			return []
		}

		return userLayerList.filter((i) => {
			const layerOnActiveLayerList = !!activeOverlayLayerList.find(
				(x) => +x.get('idLayer') === +i.id
			)

			console.log({ layerOnActiveLayerList })

			return layerOnActiveLayerList && !!i?.classifierFilterRules?.cfr?.cfrCID
		})
	}, [activeOverlayLayerList, userLayerList])

	useEffect(() => {
		console.log({ crfUserLayerList })
		dispatch(mapActions.setCRFUserLayerList(crfUserLayerList))
	}, [crfUserLayerList])

	return null
}
