import { useEffect, useMemo } from 'react'

import { useMapContext, mapLib } from 'widgets/map'
import type { ILayer } from 'shared/api/user'

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
		console.log('render overlay tile')
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
		console.log('render overlay img')
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
