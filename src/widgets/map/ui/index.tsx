import { useEffect, useRef, useState } from 'react'

import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'
import { MapContextProvider, mapSelectors } from 'widgets/map'

import { OnSingleClick, OnMoveend, OnLoadEnd } from './events'
import { InitLayers } from './init-layers'
import { MapControlsLayout, MapPageLayout } from './layouts'
import {
	ObserveCrfLayers,
	ObserveActiveIdLayers,
	ObserveCrfValues,
} from './observe'

import type { Map } from 'ol'
import { fromLonLat } from 'ol/proj'
import * as ol from 'ol'
import VectorSource from 'ol/source/Vector'
import { Geometry } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'

interface IMapWidgetProps {
	coords: number[]
	zoom: number
}

export const MapWidget: React.FC<IMapWidgetProps> = ({ coords, zoom }) => {
	const mapOnLoaded = useAppSelector(mapSelectors.selectMapOnLoadEnd)
	const userLayerList = useAppSelector(userSelectors.selectUserLayerList)

	const [map, setMap] = useState<Map | null>(null)

	const mapRef = useRef<HTMLDivElement>(null)
	const dataInfoSourceRef = useRef<VectorSource>(new VectorSource())

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
			<MapContextProvider
				value={{ map, dataInfoSource: dataInfoSourceRef.current }}
			>
				<OnLoadEnd />
				<OnMoveend />

				<InitLayers userLayerList={userLayerList} />

				{mapOnLoaded && <OnSingleClick />}

				{mapOnLoaded && <ObserveActiveIdLayers />}
				{mapOnLoaded && <ObserveCrfLayers />}
				{mapOnLoaded && <ObserveCrfValues />}

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
						{mapOnLoaded && <MapControlsLayout />}
					</Box>
				</MapPageLayout>
			</MapContextProvider>
		</>
	)
}
