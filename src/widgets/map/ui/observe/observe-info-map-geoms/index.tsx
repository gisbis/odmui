import { useCallback, useEffect, useMemo } from 'react'

import { useAppSelector } from 'shared/model'

import { useMapContext, mapSelectors, mapLib } from 'widgets/map'

import { Fill, Stroke, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import { GeoJSON } from 'ol/format'

const styles = {
	Point: new Style({
		renderer(coordinates, state) {
			// @ts-ignore
			const [x, y] = coordinates
			const ctx = state.context
			console.log({ state })
			const dx = 5
			const dy = 5

			const radius = Math.sqrt(dx * dx + dy * dy)

			const innerRadius = 0
			const outerRadius = radius * 1.4

			const gradient = ctx.createRadialGradient(
				// @ts-ignore
				x,
				y,
				innerRadius,
				x,
				y,
				outerRadius
			)
			gradient.addColorStop(0, 'rgba(255,0,0,0)')
			gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)')
			gradient.addColorStop(1, 'rgba(255,0,0,0.8)')
			ctx.beginPath()

			// @ts-ignore
			ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
			ctx.fillStyle = gradient
			ctx.fill()

			// @ts-ignore
			ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
			ctx.strokeStyle = 'rgba(255,0,0,1)'
			ctx.stroke()
		},
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
		renderer(coordinates, state) {
			// @ts-ignore
			const [[x, y], [x1, y1]] = coordinates
			const ctx = state.context
			const dx = x1 - x
			const dy = y1 - y
			const radius = Math.sqrt(dx * dx + dy * dy)

			const innerRadius = 0
			const outerRadius = radius * 1.4

			const gradient = ctx.createRadialGradient(
				x,
				y,
				innerRadius,
				x,
				y,
				outerRadius
			)
			gradient.addColorStop(0, 'rgba(255,0,0,0)')
			gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)')
			gradient.addColorStop(1, 'rgba(255,0,0,0.8)')
			ctx.beginPath()
			ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
			ctx.fillStyle = gradient
			ctx.fill()

			ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
			ctx.strokeStyle = 'rgba(255,0,0,1)'
			ctx.stroke()
		},
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

const styleFunction = (feature: any) => {
	// @ts-ignore
	return styles[feature.getGeometry().getType()]
}

export const ObserveInfoMapGeoms = () => {
	const { map, dataInfoSource } = useMapContext()
	const infoMapGeoms = useAppSelector(mapSelectors.selectInfoMapGeoms)

	useEffect(() => {
		const viewGeoms = () => {
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
		}

		viewGeoms()
	}, [infoMapGeoms, map])

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
