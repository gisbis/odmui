import { useEffect } from 'react'

import { ILayer } from 'entities/map/model'

import { ImageWMS } from 'ol/source'
import type { Map } from 'ol'
import OlImageLayer from 'ol/layer/Image'

interface IImgLayerCreatorProps {
	map: Map
	layer: ILayer
	type: string
}

export const ImageLayer: React.FC<IImgLayerCreatorProps> = ({
	map,
	layer,
	type,
}) => {
	useEffect(() => {
		const lyr = new OlImageLayer({
			source: new ImageWMS({
				url: '../gisbis/MapProxy/layer' + layer.id,
				params: {
					LAYERS: layer.layerSourceWMS
						? layer.layerSourceWMS.name
						: layer.WMSName,
					TILED: !!layer.tiled,
				},
				serverType: 'geoserver',
				ratio: 1,
			}),
			properties: { title: layer.name, idLayer: layer.id, type },
			zIndex: layer.zindex,
			visible: false,
			minZoom: layer.minzoom,
			maxZoom: layer.maxzoom,
		})

		lyr.setZIndex(layer.zindex)

		map.addLayer(lyr)
		lyr.setZIndex(layer.zindex)

		return () => {
			map.removeLayer(lyr)
		}
	}, [map])

	return null
}
