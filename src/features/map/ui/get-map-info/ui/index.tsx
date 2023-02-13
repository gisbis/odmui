import { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { mapLib, useMapContext, mapActions } from 'entities/map'
import { getMapInfo } from 'features/map'

import { MapBrowserEvent } from 'ol'
import { transform } from 'ol/proj'
import BaseEvent from 'ol/events/Event'

export const GetMapInfo = () => {
	const dispatch = useAppDispatch()

	const { map } = useMapContext()
	const mapModeType = useAppSelector((state) => state.map.currenMapModeType)

	useEffect(() => {
		if (!map) {
			return
		}

		if (mapModeType === 'measure' || mapModeType === 'edit') {
			map.removeEventListener('singleclick', handleClick)
			return
		}

		map.addEventListener('singleclick', handleClick)

		return () => {
			map.removeEventListener('singleclick', handleClick)
		}
	}, [map, mapModeType])

	const handleClick = useCallback(
		(evt: Event | BaseEvent) => {
			if (!map) {
				return
			}

			const mapEvt = evt as MapBrowserEvent<any>

			const currentZoom = map.getView().getZoom()

			if (currentZoom === undefined) {
				return
			}

			const coordinate = mapEvt.coordinate
			const lnglat = transform(coordinate, 'EPSG:3857', 'EPSG:4326')
			const lng = lnglat[0]
			const lat = lnglat[1]

			const zoom = Math.round(currentZoom)

			const activeLayers = mapLib.getActiveOverlayLayers({
				map,
				zoom: currentZoom,
			})

			if (!activeLayers.length) {
				return
			}

			const layers = activeLayers.map((i) => i.get('idLayer')).join(',')

			dispatch(
				getMapInfo({
					lat,
					lng,
					zoom,
					layers,
				})
			)
				.unwrap()
				.finally(() => {
					dispatch(mapActions.setLeftSidebarType('map-data'))
					dispatch(mapActions.setIsOpenLeftSidebar(true))
				})
		},
		[map]
	)

	return null
}
