import { useContext, useEffect } from 'react'
import { IMapContext, MapContext } from 'entities/map/context'
import { TileSource } from 'shared/model'

import OLTileLayer from 'ol/layer/Tile'

interface ITileLayerProps {
	source: TileSource
	properties?: { [x: string]: any }
	zIndex: number
	visible: boolean
}

export const TileLayer: React.FC<ITileLayerProps> = ({
	source,
	zIndex,
	visible,
	properties,
}) => {
	const { map } = useContext(MapContext) as IMapContext

	useEffect(() => {
		if (!map) return

		const tileLayer = new OLTileLayer({
			source,
			zIndex,
			visible,
			properties,
		})

		map.addLayer(tileLayer)
		tileLayer.setZIndex(zIndex)

		return () => {
			if (map) {
				map.removeLayer(tileLayer)
			}
		}
	}, [map])
	return null
}
