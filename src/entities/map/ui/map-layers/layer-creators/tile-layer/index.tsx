import { useEffect } from 'react'

import { Tile as OlTileLayer } from 'ol/layer'
import { Tile as TileSource } from 'ol/source'
import type { Map } from 'ol'

interface ITileLayerCreatorProps {
	map: Map
	id: string | number
	source: TileSource
	properties?: Record<string, any>
	zIndex: number
	visible: boolean
	minZoom?: number
	maxZoom?: number
}

export const TileLayer: React.FC<ITileLayerCreatorProps> = ({
	map,
	...options
}) => {
	useEffect(() => {
		const tileLayer = new OlTileLayer(options)
		map.addLayer(tileLayer)
		tileLayer.setZIndex(options.zIndex)

		return () => {
			map.removeLayer(tileLayer)
		}
	}, [map])

	return null
}
