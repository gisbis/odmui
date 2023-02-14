import ImageLayer from 'ol/layer/Image'
import { ImageWMS } from 'ol/source'

import type { ILayer } from 'entities/select'
import { LAYER_SOURCE_URL } from '../../config'

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
			type: isBase ? 'base' : 'overlay',
		},
		zIndex: layer.zindex,
		visible: false,
		minZoom: layer.minzoom,
		maxZoom: layer.maxzoom,
	})

	imgLayer.setZIndex(layer.zindex)

	return imgLayer
}
