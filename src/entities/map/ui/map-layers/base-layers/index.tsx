import { useContext, useEffect } from 'react'

import type { ITileLayerProps } from '../layer-creators'
import { TileCreator } from '../layer-creators'

import { IMapContext, MapContext } from 'entities/map/context'

import { OSM, XYZ } from 'ol/source'

const commonBaseLayers: ITileLayerProps[] = [
	{
		id: 'osm',
		properties: { title: 'OSM', type: 'base' },
		source: new OSM(),
		visible: true,
		zIndex: 0,
	},
	{
		id: 'google',
		properties: { title: 'google', type: 'base' },
		source: new XYZ({
			crossOrigin: 'anonymous',
			url: 'https://mts0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
		}),
		visible: false,
		zIndex: 0,
	},
	{
		id: 'yandex',
		properties: { title: 'yandex', type: 'base' },
		source: new XYZ({
			crossOrigin: 'anonymous',
			url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=3.249.0&x={x}&y={y}&z={z}&lang=tr_TR',
		}),
		visible: false,
		zIndex: 0,
	},
]

export const BaseLayers = () => {
	const { map } = useContext(MapContext) as IMapContext

	if (!map) {
		return null
	}

	return (
		<>
			{commonBaseLayers.map((options) => (
				<TileCreator key={options.id} map={map} {...options} />
			))}
		</>
	)
}
