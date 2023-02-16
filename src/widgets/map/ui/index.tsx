import { useEffect, useRef, useState } from 'react'

import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'
import { MapContextProvider, mapSelectors } from 'widgets/map'

import { OnSingleClick, OnMoveend, OnLoadEnd } from './events'
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
	const mapOnLoaded = useAppSelector(mapSelectors.selectMapOnLoadEnd)
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

	return (
		<>
			<MapContextProvider value={{ map }}>
				<InitLayers />
				<OnLoadEnd />
				<OnMoveend />

				{mapOnLoaded && <OnSingleClick />}

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
