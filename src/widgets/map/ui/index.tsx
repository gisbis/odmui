import { useEffect, useRef, useState } from 'react'

import { Box } from '@mui/material'

import { useIsBreakpoint } from 'shared/hooks'
import { BREAKPOINTS } from 'shared/config'
import type { IUserBoundBox } from 'shared/api/user'
import { useAppSelector } from 'shared/model'

import { userSelectors } from 'entities/user'

import { MapContextProvider, mapSelectors } from 'widgets/map'

import { OnSingleClick, OnMoveend, OnLoadEnd } from './events'
import { InitLayers } from './init-layers'

import {
	ObserveCrfLayers,
	ObserveActiveIdLayers,
	ObserveCrfValues,
	ObserveInfoMapGeoms,
	ObserveUriParams,
} from './observe'

import {
	DesktopPageLayout,
	DesktopControlsLayout,
	MobilePageLayout,
	MobileControlsLayout,
} from './layouts'

import * as ol from 'ol'
import type { Map } from 'ol'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import { ScaleLine } from 'ol/control'

interface IMapWidgetProps {
	coords: number[]
	zoom: number
	boundBox: IUserBoundBox | undefined
}

export const MapWidget: React.FC<IMapWidgetProps> = ({
	coords,
	zoom,
	boundBox,
}) => {
	const isMobile = useIsBreakpoint(BREAKPOINTS.mobile)
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

		if (map) {
			setMap(null)
		}

		const mapObject = new ol.Map({
			view: new ol.View({
				center,
				zoom,
				//extent,
			}),
			layers: [],
			controls: [],
			overlays: [],
		})

		mapObject.setTarget(mapRef.current)

		setMap(mapObject)

		return () => mapObject.setTarget(undefined)
	}, [isMobile])

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

		const scaleLine = new ScaleLine({ bar: true, text: true, minWidth: 150 })
		map.addControl(scaleLine)
	}, [map])

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
				{mapOnLoaded && <ObserveInfoMapGeoms />}
				{mapOnLoaded && <ObserveUriParams />}

				{isMobile ? (
					<MobilePageLayout>
						<Box
							ref={mapRef}
							sx={{
								height: '100%',
								width: '100%',
								minHeight: 500,
								position: 'relative',
							}}
						/>

						{mapOnLoaded && <MobileControlsLayout />}
					</MobilePageLayout>
				) : (
					<DesktopPageLayout>
						<Box
							ref={mapRef}
							sx={{
								height: '100%',
								width: '100%',
								minHeight: 500,
								position: 'relative',
							}}
						/>

						{mapOnLoaded && <DesktopControlsLayout />}
					</DesktopPageLayout>
				)}
			</MapContextProvider>
		</>
	)
}
