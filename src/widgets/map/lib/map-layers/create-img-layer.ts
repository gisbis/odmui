import ImageLayer from 'ol/layer/Image'
import { ImageWMS } from 'ol/source'

import type { ILayer } from 'shared/api/user'
import { LAYER_SOURCE_URL } from 'shared/config'

export const createImgLayer = (
	layer: ILayer,
	isBase: boolean
): ImageLayer<ImageWMS> => {
	const imgLayer = new ImageLayer({
		source: new ImageWMS({
			url: LAYER_SOURCE_URL + layer.id,
			params: {
				LAYERS: layer.layerSourceWMS
					? layer.layerSourceWMS.name
					: layer.WMSName,
				TILED: !!layer.tiled,
			},
			serverType: 'geoserver',
			ratio: 1,
		}),
		properties: {
			title: layer.name,
			idLayer: layer.id,
			id: layer.id,
			type: isBase ? 'base' : 'overlay',
			autoload: layer.autoload,
			group: layer.LayerGroup,
		},
		zIndex: layer.zindex,
		visible: isBase ? false : !!layer.autoload,
		minZoom: layer.minzoom,
		maxZoom: layer.maxzoom,
	})

	imgLayer.setZIndex(layer.zindex)

	return imgLayer
}
