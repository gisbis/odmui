import { useEffect, useMemo } from 'react'

import type { ILayer } from 'shared/api/user'
import { useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'
import { mapLib, useMapContext } from 'widgets/map'

import { ImageWMS, TileWMS } from 'ol/source'
import TileLayer from 'ol/layer/Tile'
import ImageLayer from 'ol/layer/Image'

export const InitBaseLayers: React.FC<{ layerList: ILayer[] }> = ({
	layerList,
}) => {
	const { map } = useMapContext()

	const defaultBaseLayerId =
		useAppSelector(userSelectors.getSettingById(21)) || 'osm'

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
			const isBase = true
			const tileLayer = mapLib.createTileLayer(layer, isBase)

			if (String(layer.id) === String(defaultBaseLayerId)) {
				tileLayer.setVisible(true)
			}

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
			const isBase = true
			const imgLayer = mapLib.createImgLayer(layer, isBase)

			if (String(layer.id) === String(defaultBaseLayerId)) {
				imgLayer.setVisible(true)
			}

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
