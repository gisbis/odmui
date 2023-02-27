import { useEffect, useMemo } from 'react'

import type { ILayer } from 'shared/api/user'

import { useMapContext, mapLib } from 'widgets/map'

import TileLayer from 'ol/layer/Tile'
import { ImageWMS, TileWMS } from 'ol/source'
import ImageLayer from 'ol/layer/Image'

export const InitOverlayLayers: React.FC<{ layerList: ILayer[] }> = ({
	layerList,
}) => {
	const { map } = useMapContext()

	const tileLayerList = useMemo(() => {
		return layerList.filter((i) => !!i.tiled)
	}, [layerList])

	const imgLayerList = useMemo(() => {
		return layerList.filter((i) => !i.tiled)
	}, [layerList])

	useEffect(() => {
		if (!map || !tileLayerList.length) {
			return
		}

		const mapLayerList: TileLayer<TileWMS>[] = []

		tileLayerList.forEach((layer) => {
			const isBase = false
			const tileLayer = mapLib.createTileLayer(layer, isBase)

			map.addLayer(tileLayer)

			mapLayerList.push(tileLayer)
		})

		return () => {
			mapLayerList.forEach((layer) => {
				map.removeLayer(layer)
			})
		}
	}, [map, tileLayerList])

	useEffect(() => {
		if (!map || !imgLayerList.length) {
			return
		}

		const mapLayerList: ImageLayer<ImageWMS>[] = []

		imgLayerList.forEach((layer) => {
			const isBase = false
			const imgLayer = mapLib.createImgLayer(layer, isBase)

			map.addLayer(imgLayer)

			mapLayerList.push(imgLayer)
		})

		return () => {
			mapLayerList.forEach((layer) => {
				map.removeLayer(layer)
			})
		}
	}, [map, imgLayerList])

	return null
}
