import { useEffect } from 'react'
import { useMapContext } from 'widgets/map'
import { useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'

import TileLayer from 'ol/layer/Tile'
import { OSM, XYZ } from 'ol/source'

export const InitCommonBaseLayers = () => {
	const { map } = useMapContext()

	const defaultBaseLayerId =
		useAppSelector(userSelectors.getSettingById(21)) || 'osm'

	useEffect(() => {
		if (!map) {
			return
		}

		const osm = new TileLayer({
			properties: { title: 'OSM', type: 'base', idLayer: 'osm' },
			source: new OSM(),
			visible: defaultBaseLayerId === 'osm',
			zIndex: 0,
		})
		osm.setZIndex(0)

		const google = new TileLayer({
			properties: { title: 'google', type: 'base', idLayer: 'google' },
			source: new XYZ({
				crossOrigin: 'anonymous',
				url: 'https://mts0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
			}),
			visible: defaultBaseLayerId === 'google',
			zIndex: 0,
		})
		google.setZIndex(0)

		const yandex = new TileLayer({
			properties: { title: 'yandex', type: 'base', idLayer: 'yandex' },
			source: new XYZ({
				crossOrigin: 'anonymous',
				url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=3.249.0&x={x}&y={y}&z={z}&lang=tr_TR',
			}),
			visible: defaultBaseLayerId === 'yandex',
			zIndex: 0,
		})

		yandex.setZIndex(0)

		map.addLayer(osm)
		map.addLayer(yandex)
		map.addLayer(google)

		return () => {
			map.removeLayer(osm)
			map.removeLayer(yandex)
			map.removeLayer(google)
		}
	}, [map, defaultBaseLayerId])

	return null
}
