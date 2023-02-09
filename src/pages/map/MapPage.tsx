import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

import { Map } from 'shared/model'

import { MapPageLayout } from 'entities/map/components/layouts/map-page/MapPageLayout'
import { MapControlsLayout } from 'entities/map/components/layouts/map-controls/MapControlsLayout'
import {
	FetchMapSymbols,
	Measure,
	ToggleLeftSidebar,
	ToggleRightSidebar,
	ZoomGroup,
} from 'features/map/components/map-controls'

import { BaseLayers } from 'widgets/map/components/map-layers'
import { MapHomeScreen } from 'widgets/map/components/map-home-screen/MapHomeScreen'

import { FetchMapDataContainer } from 'pages/map/containers/FetchMapDataContainer'

import { IMapContext, MapContext } from 'entities/map'

import * as ol from 'ol'
import { fromLonLat } from 'ol/proj'

import './index.scss'

const initialZoom = 8
const initialCenterCoords = fromLonLat([30.3, 59.94])

const MapPage: React.FC = () => {
	const mapRef = useRef<HTMLDivElement | null>(null)
	const [map, setMap] = useState<Map | null>(null)

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

	const renderRightSidebarContent = () => {
		return <>RIGHT sidebar</>
	}

	const renderLeftSidebarContent = () => {
		return <MapHomeScreen />
	}

	const value: IMapContext = {
		map,
		renderRightSidebarContent,
		renderLeftSidebarContent,
	}

	return (
		<FetchMapDataContainer>
			<MapContext.Provider value={value}>
				<BaseLayers />

				<MapPageLayout>
					<Box className="ol-map" ref={mapRef}>
						<MapControlsLayout>
							<ToggleLeftSidebar />
							<FetchMapSymbols />
							<ToggleRightSidebar />

							<ZoomGroup />
							<Measure />
						</MapControlsLayout>
					</Box>
				</MapPageLayout>
			</MapContext.Provider>
		</FetchMapDataContainer>
	)
}

export default MapPage
