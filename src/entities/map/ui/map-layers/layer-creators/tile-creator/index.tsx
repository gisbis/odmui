import { useEffect } from 'react'

import { Tile as TileLayer } from 'ol/layer'
import { Tile as TileSource } from 'ol/source'
import type { Map } from 'ol'

export interface ITileLayerProps {
	id: string | number
	source: TileSource
	properties?: Record<string, any>
	zIndex: number
	visible: boolean
}

interface ITileLayerCreatorProps extends ITileLayerProps {
	map: Map
}

export const TileCreator: React.FC<ITileLayerCreatorProps> = ({
	map,
	...options
}) => {
	useEffect(() => {
		const tileLayer = new TileLayer(options)
		map.addLayer(tileLayer)
		console.log({ tileLayer })
		tileLayer.setZIndex(options.zIndex)

		return () => {
			console.log('remove')
			map.removeLayer(tileLayer)
		}
	}, [map])

	return null
}
