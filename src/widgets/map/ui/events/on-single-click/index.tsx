import { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { BackdropSpinner } from 'shared/ui'

import { useMapContext, mapModel, mapActions, mapLib } from 'widgets/map'

import type { MapBrowserEvent } from 'ol'
import BaseEvent from 'ol/events/Event'
import { transform } from 'ol/proj'

export const OnSingleClick = () => {
	const dispatch = useAppDispatch()
	const { map } = useMapContext()
	const mapModeType = useAppSelector((state) => state.map.currenMapModeType)
	const currentZoom = useAppSelector((state) => state.map.currentZoom)
	const status = useAppSelector((state) => state.map.status)

	useEffect(() => {
		if (
			!map ||
			mapModeType === 'measure' ||
			mapModeType === 'edit' ||
			!currentZoom
		) {
			return
		}

		map.addEventListener('singleclick', handleSingleClick)

		return () => {
			map.removeEventListener('singleclick', handleSingleClick)
		}
	}, [map, mapModeType, currentZoom])

	const handleSingleClick = useCallback(
		(evt: Event | BaseEvent) => {
			if (!map || currentZoom === undefined) {
				return
			}

			const mapEvt = evt as MapBrowserEvent<any>

			const coordinate = mapEvt.coordinate
			const lnglat = transform(coordinate, 'EPSG:3857', 'EPSG:4326')
			const lng = lnglat[0]
			const lat = lnglat[1]

			const zoom = Math.round(currentZoom)
			const activeLayers = mapLib.getMapActiveOverlayLayers({
				map,
				zoom: currentZoom,
			})

			if (!activeLayers.length) {
				return
			}

			const layers = activeLayers.map((i) => i.get('idLayer')).join(',')

			dispatch(
				mapModel.getMapInfo({
					lat,
					lng,
					zoom,
					layers,
				})
			)
				.unwrap()
				.finally(() => {
					dispatch(mapActions.setLeftSidebarContentType('map-data'))
					dispatch(mapActions.setIsOpenLeftSidebar(true))
				})
		},
		[map, currentZoom]
	)

	return status === 'loading' ? <BackdropSpinner /> : null
}
