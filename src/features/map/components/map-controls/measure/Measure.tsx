import { ButtonGroup } from '@mui/material'
import { LineMeasure } from './LineMeasure'
import { PolygonMeasure } from './PolygonMeasure'
import { useContext, useEffect, useRef, useState } from 'react'
import { CloseMeasure } from 'features/map/components/map-controls/measure/CloseMeasure'

import { Fill, RegularShape, Stroke, Style, Text } from 'ol/style'
import CircleStyle from 'ol/style/Circle'

import { OLDraw, OLFeatureLike, OLGeometry } from 'shared/model'
import VectorSource from 'ol/source/Vector'
import { Draw, Modify } from 'ol/interaction'
import { LineString, Point } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'

import { mapHelpers } from 'shared/lib'
import { IMapContext, MapContext } from 'entities/map'

export type MeasureModeType = 'LineString' | 'Polygon' | undefined

let tipPoint: OLGeometry

const style = new Style({
	fill: new Fill({
		color: 'rgba(255, 255, 255, 0.2)',
	}),
	stroke: new Stroke({
		color: 'rgba(255, 0, 0, 0.5)',
		lineDash: [10, 10],
		width: 2,
	}),
	image: new CircleStyle({
		radius: 5,
		stroke: new Stroke({
			color: 'rgba(0, 0, 0, 0.7)',
		}),
		fill: new Fill({
			color: 'rgba(255, 255, 255, 0.2)',
		}),
	}),
})

const labelStyle = new Style({
	text: new Text({
		font: '14px Roboto,sans-serif',
		fill: new Fill({
			color: 'rgba(255, 255, 255, 1)',
		}),
		backgroundFill: new Fill({
			color: 'rgba(0, 0, 0, 0.7)',
		}),
		padding: [3, 3, 3, 3],
		textBaseline: 'bottom',
		offsetY: -15,
	}),
	image: new RegularShape({
		radius: 8,
		points: 3,
		angle: Math.PI,
		displacement: [0, 10],
		fill: new Fill({
			color: 'rgba(0, 0, 0, 0.7)',
		}),
	}),
})

const tipStyle = new Style({
	text: new Text({
		font: '12px Roboto,sans-serif',
		fill: new Fill({
			color: 'rgba(255, 255, 255, 1)',
		}),
		backgroundFill: new Fill({
			color: 'rgba(0, 0, 0, 0.4)',
		}),
		padding: [2, 2, 2, 2],
		textAlign: 'left',
		offsetX: 15,
	}),
})

const modifyStyle = new Style({
	image: new CircleStyle({
		radius: 5,
		stroke: new Stroke({
			color: 'rgba(0, 0, 0, 0.7)',
		}),
		fill: new Fill({
			color: 'rgba(255, 0, 0, 0.4)',
		}),
	}),
	text: new Text({
		text: 'Drag to modify',
		font: '12px Calibri,sans-serif',
		fill: new Fill({
			color: 'rgba(255, 255, 255, 1)',
		}),
		backgroundFill: new Fill({
			color: 'rgba(0, 0, 0, 0.7)',
		}),
		padding: [2, 2, 2, 2],
		textAlign: 'left',
		offsetX: 15,
	}),
})

const segmentStyle = new Style({
	text: new Text({
		font: '12px Calibri,sans-serif',
		fill: new Fill({
			color: 'rgba(255, 255, 255, 1)',
		}),
		backgroundFill: new Fill({
			color: 'rgba(0, 0, 0, 0.4)',
		}),
		padding: [2, 2, 2, 2],
		textBaseline: 'bottom',
		offsetY: -12,
	}),
	image: new RegularShape({
		radius: 6,
		points: 3,
		angle: Math.PI,
		displacement: [0, 8],
		fill: new Fill({
			color: 'rgba(0, 0, 0, 0.4)',
		}),
	}),
})

const segmentStyles = [segmentStyle]

const source = new VectorSource()

const modify = new Modify({ source: source, style: modifyStyle })

function styleFunction(
	feature: OLFeatureLike,
	measureType?: MeasureModeType,
	tip?: string
) {
	const styles = [style]
	const geometry = feature.getGeometry() as OLGeometry

	if (!geometry) {
		return
	}

	const type = geometry.getType()
	let point, label, line
	if (!measureType || measureType === type) {
		if (type === 'Polygon') {
			// @ts-ignore
			point = geometry.getInteriorPoint()
			label = mapHelpers.formatArea(geometry)
			// @ts-ignore
			line = new LineString(geometry.getCoordinates()[0])
		} else if (type === 'LineString') {
			// @ts-ignore
			point = new Point(geometry.getLastCoordinate())
			label = mapHelpers.formatLength(geometry)
			line = geometry
		}
	}
	if (line) {
		let count = 0
		// @ts-ignore
		line.forEachSegment(function (a, b) {
			const segment = new LineString([a, b])
			const label = mapHelpers.formatLength(segment)
			if (segmentStyles.length - 1 < count) {
				segmentStyles.push(segmentStyle.clone())
			}
			const segmentPoint = new Point(segment.getCoordinateAt(0.5))
			segmentStyles[count].setGeometry(segmentPoint)
			segmentStyles[count].getText().setText(label)
			styles.push(segmentStyles[count])
			count++
		})
	}
	if (label) {
		labelStyle.setGeometry(point)
		labelStyle.getText().setText(label)
		styles.push(labelStyle)
	}
	if (
		tip &&
		type === 'Point' &&
		!modify.getOverlay().getSource().getFeatures().length
	) {
		tipPoint = geometry
		tipStyle.getText().setText(tip)
		styles.push(tipStyle)
	}
	return styles
}

const vector = new VectorLayer({
	source: source,
	style: function (feature) {
		return styleFunction(feature)
	},
})

export const Measure = () => {
	const { map } = useContext(MapContext) as IMapContext

	const drawRef = useRef<OLDraw | null>(null)
	const [measureMode, setMeasureMode] = useState<MeasureModeType>(undefined)

	useEffect(() => {
		clear()

		if (!map || measureMode === undefined) {
			return
		}

		initInteraction()

		return () => {
			clear()
		}
	}, [measureMode, map])

	const clear = () => {
		if (!map) {
			return
		}

		if (drawRef.current) {
			map.removeInteraction(drawRef.current)
		}

		source.clear()

		map.removeInteraction(modify)
		map.removeLayer(vector)

		drawRef.current = null
	}

	const initInteraction = () => {
		if (!map) {
			return
		}
		map.addLayer(vector)
		map.addInteraction(modify)

		const activeTip =
			'Click to continue drawing the ' +
			(measureMode === 'Polygon' ? 'polygon' : 'line')

		const idleTip = 'Click to start measuring'
		let tip = idleTip

		const draw = new Draw({
			source: source,
			// @ts-ignore
			type: measureMode,
			style: function (feature) {
				return styleFunction(feature, measureMode, tip)
			},
		})
		drawRef.current = draw

		draw.on('drawstart', function () {
			source.clear()
			modify.setActive(false)
			tip = activeTip
		})
		draw.on('drawend', function () {
			modifyStyle.setGeometry(tipPoint)
			modify.setActive(true)
			map?.once('pointermove', function () {
				modifyStyle.setGeometry(tipPoint)
			})
			tip = idleTip
		})
		modify.setActive(true)
		map.addInteraction(draw)
	}

	return (
		<ButtonGroup>
			<LineMeasure
				isActive={measureMode === 'LineString'}
				cbcOnClick={() => setMeasureMode('LineString')}
			/>

			<PolygonMeasure
				isActive={measureMode === 'Polygon'}
				cbcOnClick={() => setMeasureMode('Polygon')}
			/>

			{measureMode !== undefined && (
				<CloseMeasure cbcOnClick={() => setMeasureMode(undefined)} />
			)}
		</ButtonGroup>
	)
}
