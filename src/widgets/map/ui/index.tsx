import { useEffect, useRef, useState } from 'react'

import { Box } from '@mui/material'

import { useActionCreators } from 'shared/model'

import { MapContextProvider } from '../context'
import { mapActions } from '../model'

import { OnSingleClick } from './events'
import { InitLayers } from './init-layers'
import { MapControlsLayout, MapPageLayout } from './layouts'

import type { Map } from 'ol'
import { fromLonLat } from 'ol/proj'
import * as ol from 'ol'

interface IMapWidgetProps {
	coords: number[]
	zoom: number
}

export const MapWidget: React.FC<IMapWidgetProps> = ({ coords, zoom }) => {
	const actions = useActionCreators(mapActions)

	const [map, setMap] = useState<Map | null>(null)
	const mapRef = useRef<HTMLDivElement>(null)

	const center = fromLonLat(coords)

	useEffect(() => {
		if (!mapRef.current) {
			return
		}

		const mapObject = new ol.Map({
			view: new ol.View({
				center,
				zoom,
			}),
			layers: [],
			controls: [],
			overlays: [],
		})

		mapObject.setTarget(mapRef.current)

		setMap(mapObject)

		return () => mapObject.setTarget(undefined)
	}, [])

	useEffect(() => {
		map?.getView().setZoom(zoom)
	}, [zoom])

	useEffect(() => {
		map?.getView().setCenter(center)
	}, [center])

	useEffect(() => {
		if (!map) {
			return
		}

		map.on('moveend', () => {
			const zoom = map.getView().getZoom()
			actions.setCurrentZoom(zoom)
		})
	}, [map])

	return (
		<>
			<MapContextProvider value={{ map }}>
				<InitLayers />

				<OnSingleClick />

				<MapPageLayout>
					<Box
						ref={mapRef}
						sx={{
							height: '100%',
							width: '100%',
							minHeight: 500,
							position: 'relative',
						}}
					>
						<MapControlsLayout />
					</Box>
				</MapPageLayout>
			</MapContextProvider>
		</>
	)
}