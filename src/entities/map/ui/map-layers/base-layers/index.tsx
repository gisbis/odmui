import { useMemo } from 'react'

import { useAppSelector } from 'shared/model'
import { useMapContext, ImageLayer, TileLayer, mapLib } from 'entities/map'

import { OSM, TileWMS, XYZ } from 'ol/source'

const commonBaseLayers = [
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
	const { map } = useMapContext()
	const layerList = useAppSelector((state) => state.map.layerList)

	const baseLayerList = useMemo(() => {
		return mapLib.filterBaseLayers(layerList)
	}, [layerList])

	if (!map) {
		return null
	}

	return (
		<>
			{commonBaseLayers.map((options) => (
				<TileLayer key={options.id} map={map} {...options} />
			))}

			{baseLayerList.map((lyr) =>
				lyr.tiled ? (
					<TileLayer
						key={lyr.id}
						map={map}
						id={lyr.id}
						source={
							new TileWMS({
								url: `../gisbis/MapProxy/layer${lyr.id}`,
								params: {
									LAYERS: lyr.layerSourceWMS
										? lyr.layerSourceWMS.name
										: lyr.WMSName,
									TILED: !!lyr.tiled,
								},
								serverType: 'geoserver',
								transition: 0,
							})
						}
						properties={{ title: lyr.name, idLayer: lyr.id, type: 'base' }}
						zIndex={lyr.zindex}
						visible={false}
						minZoom={lyr.minzoom}
						maxZoom={lyr.maxzoom}
					/>
				) : (
					<ImageLayer map={map} layer={lyr} type="base" />
				)
			)}
		</>
	)
}
