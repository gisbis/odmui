import { IconButton } from '@mui/material'
import MapIcon from '@mui/icons-material/Map'
import { Fill, Stroke, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import { parsersLib } from 'shared/lib'
import { mapLib, useMapContext } from 'widgets/map/index'
import { GeoJSON } from 'ol/format'
import { useCallback } from 'react'

const polygonStyle = new Style({
	stroke: new Stroke({
		color: 'blue',
		width: 3,
	}),
	fill: new Fill({
		color: 'rgba(0, 0, 255, 0.1)',
	}),
})

export const GeomOnMap: React.FC<{ geom: string }> = ({ geom }) => {
	const { map, dataInfoSource } = useMapContext()

	const handleClick = (evt: React.MouseEvent) => {
		evt.stopPropagation()
		dataInfoSource.clear()

		if (!map) {
			return
		}

		const layers = map.getAllLayers().filter((i) => {
			return i.get('type') === 'data-info-layer'
		})

		layers.forEach((layer) => {
			map.removeLayer(layer)
		})

		const geomLayer = new VectorLayer({
			source: dataInfoSource,
			style: polygonStyle,
			zIndex: 100,
			properties: {
				type: 'data-info-layer',
			},
		})

		map.addLayer(geomLayer)

		viewPolygon()
	}

	const viewPolygon = useCallback(() => {
		try {
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
			throw e
		}
	}, [geom])

	return (
		<IconButton size="small" aria-label="share" onClick={handleClick}>
			<MapIcon sx={{ fontSize: '16px' }} />
		</IconButton>
	)
}
