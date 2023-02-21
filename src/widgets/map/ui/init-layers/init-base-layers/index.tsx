import { useEffect, useMemo } from 'react'

import { mapLib, useMapContext } from 'widgets/map'
import type { ILayer } from 'shared/api/user'

import { ImageWMS, TileWMS } from 'ol/source'
import TileLayer from 'ol/layer/Tile'
import ImageLayer from 'ol/layer/Image'

export const InitBaseLayers: React.FC<{ layerList: ILayer[] }> = ({
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
		console.log('render base tile')
		const mapLayerList: TileLayer<TileWMS>[] = []

		tileLayerList.forEach((layer) => {
			const isBase = true
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
		console.log('render base img')
		const mapLayerList: ImageLayer<ImageWMS>[] = []

		imgLayerList.forEach((layer) => {
			const isBase = true
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
