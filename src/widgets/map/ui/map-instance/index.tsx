import { useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'
import { BaseLayers, MapContext } from 'entities/map'
import { MapControlsLayout } from 'entities/map/ui'
import { MapPageLayout } from 'widgets/page-layouts'

import type { Map } from 'ol'
import * as ol from 'ol'
import { fromLonLat } from 'ol/proj'

interface IMapInstanceProps {
	initialZoom: number
	initialCoords: number[]
}
export const MapInstance: React.FC<IMapInstanceProps> = ({
	initialCoords,
	initialZoom,
}) => {
	const {
		isOpenRightsSidebar,
		isOpenLeftSidebar,
		rightSidebarContent,
		leftSidebarContent,
	} = useAppSelector((state) => state.map)

	const [map, setMap] = useState<Map | null>(null)
	const mapRef = useRef<HTMLDivElement>(null)
	const center = useMemo(() => fromLonLat(initialCoords), [initialCoords])

	useEffect(() => {
		if (!mapRef.current) {
			return
		}

		let options = {
			view: new ol.View({
				center,
				zoom: initialZoom,
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
		if (!map) return
		map.getView().setZoom(initialZoom)
	}, [map, initialZoom])

	useEffect(() => {
		if (!map) return
		map.getView().setCenter(center)
	}, [map, center])

	return (
		<MapContext.Provider value={{ map }}>
			<BaseLayers />

			<MapPageLayout
				isOpenRightSidebar={isOpenRightsSidebar}
				isOpenLeftSidebar={isOpenLeftSidebar}
				leftSidebarComponent={leftSidebarContent}
				rightSidebarComponent={rightSidebarContent}
			>
				<Box
					ref={mapRef}
					sx={{
						height: '100%',
						width: '100%',
						minHeight: 500,
						position: 'relative',
					}}
				>
					<MapControlsLayout>Controls</MapControlsLayout>
				</Box>
			</MapPageLayout>
		</MapContext.Provider>
	)
}
