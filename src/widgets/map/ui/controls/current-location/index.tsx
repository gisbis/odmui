import { useRef } from 'react'

import LocationOnIcon from '@mui/icons-material/LocationOn'

import { MapIconButton } from 'shared/ui'

import { useMapContext } from 'widgets/map'

import * as ol from 'ol'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Circle, Point } from 'ol/geom'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'

export const CurrentLocation = () => {
	const { map } = useMapContext()
	const source = useRef(new VectorSource())

	const handleClick = () => {
		source.current.clear()

		if (!map) {
			return
		}

		if (!navigator.geolocation) {
			alert('geolocation is not in navigator')
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { longitude, latitude } = position.coords
					console.log({ position })

					const coordinates = fromLonLat([longitude, latitude])

					const positionFeature = new Feature({
						geometry: new Circle(coordinates, 15),
					})

					positionFeature.setStyle(
						new Style({
							image: new CircleStyle({
								radius: 6,
								fill: new Fill({
									color: '#3399CC',
								}),
								stroke: new Stroke({
									color: '#fff',
									width: 2,
								}),
							}),
						})
					)

					source.current.addFeature(positionFeature)

					const layer = new VectorLayer({
						source: source.current,
						zIndex: 100,
					})

					map.addLayer(layer)

					const geometry = source.current.getFeatures()[0]?.getGeometry()

					geometry &&
						// @ts-ignore
						map?.getView().fit(geometry, { maxZoom: 18, duration: 500 })
				},
				(e) => {
					console.log(e)
				}
			)
		}
	}

	return (
		<MapIconButton
			color="inherit"
			aria-label="directions"
			onClick={handleClick}
		>
			<LocationOnIcon />
		</MapIconButton>
	)
}
