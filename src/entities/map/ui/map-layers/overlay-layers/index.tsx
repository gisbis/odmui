import { useMemo } from 'react'
import { useAppSelector } from 'shared/model'
import { useMapContext, TileLayer, ImageLayer, mapLib } from 'entities/map'

import { TileWMS } from 'ol/source'

export const OverlayLayers = () => {
	const layerList = useAppSelector((state) => state.map.layerList)

	const overlayLayerList = useMemo(() => {
		return mapLib.filterOverlayLayers(layerList)
	}, [layerList])
	const { map } = useMapContext()

	if (!map) {
		return null
	}

	return (
		<>
			{overlayLayerList.map((layer) =>
				!!layer.tiled ? (
					<TileLayer
						key={layer.id}
						map={map}
						id={layer.id}
						source={
							new TileWMS({
								url: '../gisbis/MapProxy/layer' + layer.id,
								params: {
									LAYERS: layer.layerSourceWMS
										? layer.layerSourceWMS.name
										: layer.WMSName,
									TILED: !!layer.tiled,
								},
								serverType: 'geoserver',
								transition: 0,
							})
						}
						properties={{
							title: layer.name,
							idLayer: layer.id,
							type: 'overlay',
						}}
						zIndex={layer.zindex}
						visible={!!layer.autoload}
						maxZoom={layer.maxzoom}
						minZoom={layer.minzoom}
					/>
				) : (
					<ImageLayer key={layer.id} map={map} layer={layer} type="overlay" />
				)
			)}
		</>
	)
}
