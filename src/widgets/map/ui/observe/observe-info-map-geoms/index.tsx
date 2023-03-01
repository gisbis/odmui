import { useCallback, useEffect } from 'react'

import { useAppSelector } from 'shared/model'
import { parsersLib } from 'shared/lib'

import { useMapContext, mapSelectors, mapLib } from 'widgets/map'

import { Fill, Stroke, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import { GeoJSON } from 'ol/format'

const polygonStyle = new Style({
	stroke: new Stroke({
		color: 'blue',
		width: 3,
	}),
	fill: new Fill({
		color: 'rgba(0, 0, 255, 0.1)',
	}),
})

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
				style: polygonStyle,
				zIndex: 100,
				properties: {
					type: 'data-info-layer',
				},
			})

			map.addLayer(geomLayer)
			const parsedGeom = parsersLib.xmlToJson(geom) as any

			if (parsedGeom === null) {
				throw new Error('error parse geom')
			}

			const surfaceMember =
				parsedGeom?.['gml:MultiSurface']?.['gml:surfaceMember']

			if (!surfaceMember) {
				throw new Error('error get surfaceMember')
			}

			let features = []

			if (Array.isArray(surfaceMember)) {
				surfaceMember.forEach((i) => {
					features.push(mapLib.getPolygonFeature(i?.['gml:Polygon']))
				})
			} else {
				features.push(mapLib.getPolygonFeature(surfaceMember?.['gml:Polygon']))
			}

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

			const polygon = dataInfoSource.getFeatures()[0]?.getGeometry()
			// @ts-ignore
			polygon && map?.getView().fit(polygon, { padding: [170, 50, 30, 150] })
		} catch (e) {
			console.log(e)
		}
	}

	return null
}
