import { useEffect, useMemo } from 'react'

import { useAppSelector } from 'shared/model'

import TileLayer from 'ol/layer/Tile'
import { ImageWMS, OSM, TileWMS, XYZ } from 'ol/source'
import ImageLayer from 'ol/layer/Image'

import { createImgLayer, createTileLayer } from '../../lib'
import { useMapContext } from '../../context'

export const InitLayers = () => {
	const { map } = useMapContext()

	const layerList = useAppSelector((state) => state.user.layerList)

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
			const isBase = !!layer.type && +layer.type === 3
			const tileLayer = createTileLayer(layer, isBase)

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
			const isBase = !!layer.type && +layer.type === 3
			const imgLayer = createImgLayer(layer, isBase)

			map.addLayer(imgLayer)

			mapLayerList.push(imgLayer)
		})

		return () => {
			mapLayerList.forEach((layer) => {
				map.removeLayer(layer)
			})
		}
	}, [map, imgLayerList])

	useEffect(() => {
		if (!map) {
			return
		}

		const osm = new TileLayer({
			properties: { title: 'OSM', type: 'base' },
			source: new OSM(),
			visible: true,
			zIndex: 0,
		})
		osm.setZIndex(0)

		const google = new TileLayer({
			properties: { title: 'google', type: 'base' },
			source: new XYZ({
				crossOrigin: 'anonymous',
				url: 'https://mts0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
			}),
			visible: false,
			zIndex: 0,
		})
		google.setZIndex(0)

		const yandex = new TileLayer({
			properties: { title: 'yandex', type: 'base' },
			source: new XYZ({
				crossOrigin: 'anonymous',
				url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=3.249.0&x={x}&y={y}&z={z}&lang=tr_TR',
			}),
			visible: false,
			zIndex: 0,
		})
		yandex.setZIndex(0)

		map.addLayer(osm)
		map.addLayer(yandex)
		map.addLayer(google)

		return () => {
			map.removeLayer(osm)
			map.removeLayer(yandex)
			map.removeLayer(google)
		}
	}, [map])

	return null
}
