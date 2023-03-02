import { useCallback, useEffect } from 'react'

import { useAppSelector } from 'shared/model'

import { useMapContext, mapSelectors, mapLib } from 'widgets/map'

import { Fill, Stroke, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import { GeoJSON } from 'ol/format'
import CircleStyle from 'ol/style/Circle'

const image = new CircleStyle({
	radius: 5,
	fill: new Fill({
		color: 'rgba(0, 0, 255, 0.1)',
	}),
	stroke: new Stroke({
		color: 'blue',
		width: 3,
	}),
})

const styles = {
	Point: new Style({
		image: image,
	}),
	LineString: new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
	}),
	MultiLineString: new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
	}),
	MultiPoint: new Style({
		image: image,
	}),
	MultiPolygon: new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
	Polygon: new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
}

const styleFunction = function (feature: any) {
	// @ts-ignore
	return styles[feature.getGeometry().getType()]
}

export const ObserveInfoMapGeoms = () => {
	const { map, dataInfoSource } = useMapContext()
	const infoMapGeoms = useAppSelector(mapSelectors.selectInfoMapGeoms)

	const viewGeoms = useCallback(() => {
		if (!map || !dataInfoSource) {
			return
		}

		dataInfoSource.clear()
		clearDataInfoLayers()

		if (!infoMapGeoms?.length) {
			return
		}

		infoMapGeoms.forEach((i) => {
			viewGeom(i.geom)
		})
	}, [infoMapGeoms, map])

	useEffect(() => {
		viewGeoms()
	}, [viewGeoms])

	const clearDataInfoLayers = () => {
		if (!map) {
			return
		}

		const layers = map.getAllLayers().filter((i) => {
			return i.get('type') === 'data-info-layer'
		})

		layers.forEach((layer) => {
			map.removeLayer(layer)
		})
	}

	const viewGeom = (geom: string) => {
		try {
			if (!map) {
				throw new Error('Map instance is not defined')
			}

			const geomLayer = new VectorLayer({
				source: dataInfoSource,
				style: styleFunction,
				zIndex: 100,
				properties: {
					type: 'data-info-layer',
				},
			})

			map.addLayer(geomLayer)

			const features = mapLib.getFeaturesFromGeom(geom)

			const geojsonObject = {
				type: 'FeatureCollection',
				crs: {
					type: 'name',
					properties: {
						name: 'EPSG:3857',
					},
				},
				features,
			}

			dataInfoSource.addFeatures(new GeoJSON().readFeatures(geojsonObject))

			const geometry = dataInfoSource.getFeatures()[0]?.getGeometry()

			// @ts-ignore
			geometry && map?.getView().fit(geometry, { maxZoom: 22, duration: 500 })
		} catch (e) {
			console.log(e)
		}
	}

	return null
}
