import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

import { MapControlsLayout } from 'entities/map/components/layouts/map-controls/MapControlsLayout'

import {
	FetchMapSymbols,
	Measure,
	ToggleLeftSidebar,
	ToggleRightSidebar,
	ZoomGroup,
} from 'features/map/components/map-controls'

import { BaseLayers, LayersContainer } from 'widgets/map/components/layers'

import { MapContext } from 'entities/map'

import { OLCoordinate, OLMap } from 'shared/model'
import * as ol from 'ol'

import './map-instance.scss'

interface IMapProps {
	initialCenterCoords: OLCoordinate
	initialZoom: number
}

export const MapInstance: React.FC<IMapProps> = ({
	initialCenterCoords,
	initialZoom,
}) => {
	const mapRef = useRef<HTMLDivElement | null>(null)
	const [map, setMap] = useState<OLMap | null>(null)

	useEffect(() => {
		if (!mapRef.current) {
			return
		}

		let options = {
			view: new ol.View({
				center: initialCenterCoords,
				zoom: initialZoom,
			}),
			controls: [],
			layers: [],
			overlays: [],
		}

		let mapObject = new ol.Map(options)
		mapObject.setTarget(mapRef.current)

		setMap(mapObject)

		return () => mapObject.setTarget(undefined)
	}, [])

	useEffect(() => {
		if (!map) return
		map.getView().setZoom(initialZoom)
	}, [initialZoom])

	useEffect(() => {
		if (!map) return
		map.getView().setCenter(initialCenterCoords)
	}, [initialCenterCoords])

	return (
		<MapContext.Provider value={{ map }}>
			<Box className="ol-map" ref={mapRef}>
				<LayersContainer>
					<BaseLayers />
				</LayersContainer>

				<MapControlsLayout>
					<ToggleLeftSidebar />
					<FetchMapSymbols />
					<ToggleRightSidebar />

					<ZoomGroup />
					<Measure />
				</MapControlsLayout>
			</Box>
		</MapContext.Provider>
	)
}
