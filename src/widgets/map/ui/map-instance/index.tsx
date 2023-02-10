import { useEffect, useRef, useState } from 'react'

import { Box } from '@mui/material'

import { BaseLayers, MapContext, MapControlsLayout } from 'entities/map'

import {
	ToggleLeftSidebar,
	LayerSwitcher,
	ViewMapSymbols,
	Measure,
	ZoomGroup,
} from 'features/map/ui'

import { MapPageLayout } from 'widgets/page-layouts'

import { Map } from 'ol'
import { fromLonLat } from 'ol/proj'

import * as ol from 'ol'

export const MapInstance = () => {
	const [map, setMap] = useState<Map | null>(null)
	const mapRef = useRef<HTMLDivElement>(null)

	const center = fromLonLat([30.3, 59.94])
	const zoom = 8

	useEffect(() => {
		if (!mapRef.current) {
			return
		}

		let options = {
			view: new ol.View({
				center,
				zoom,
			}),
			layers: [],
			controls: [],
			overlays: [],
		}

		let mapObject = new ol.Map(options)
		mapObject.setTarget(mapRef.current)
		setMap(mapObject)

		return () => mapObject.setTarget(undefined)
	}, [])

	useEffect(() => {
		if (!map) {
			return
		}

		map.getView().setZoom(zoom)
		map.getView().setCenter(center)
	}, [map])

	return (
		<>
			<MapContext.Provider value={{ map }}>
				<MapPageLayout>
					<BaseLayers />
					<Box
						ref={mapRef}
						sx={{
							height: '100%',
							width: '100%',
							minHeight: 500,
							position: 'relative',
						}}
					>
						<MapControlsLayout
							leftControls={
								<>
									<ToggleLeftSidebar />
									<ZoomGroup />
								</>
							}
							centerControls={
								<>
									<Measure />
								</>
							}
							rightControls={
								<>
									<LayerSwitcher />
									<ViewMapSymbols />
								</>
							}
						/>
					</Box>
				</MapPageLayout>
			</MapContext.Provider>
		</>
	)
}
