import { Tile as TileLayer } from 'ol/layer'
import { TileWMS } from 'ol/source'

import type { ILayer } from 'entities/select'
import { LAYER_SOURCE_URL } from 'widgets/map/config'

export const createTileLayer = (
	layer: ILayer,
	isBase: boolean
): TileLayer<TileWMS> => {
	const tileLayer = new TileLayer({
		source: new TileWMS({
			url: LAYER_SOURCE_URL + layer.id,
			params: {
				LAYERS: layer.layerSourceWMS
					? layer.layerSourceWMS.name
					: layer.WMSName,
				TILED: !!layer.tiled,
			},
			serverType: 'geoserver',
			transition: 0,
		}),
		properties: {
			title: layer.name,
			idLayer: layer.id,
			type: isBase ? 'base' : 'overlay',
			autoload: layer.autoload,
			group: layer.LayerGroup,
		},
		zIndex: layer.zindex,
		visible: isBase ? false : !!layer.autoload,
		minZoom: layer.minzoom,
		maxZoom: layer.maxzoom,
	})

	tileLayer.setZIndex(layer.zindex)

	return tileLayer
}
