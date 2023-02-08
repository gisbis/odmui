import { useState } from 'react'

import { FetchMapDataContainer } from 'pages/map/containers/FetchMapDataContainer'
import { MapInstance } from 'widgets/map/components/map-instance/MapInstance'
import { MapPageLayout } from 'entities/map/components/layouts/map-page/MapPageLayout'

import { fromLonLat } from 'ol/proj'

import './index.scss'

const initialZoom = 8
const initialCenterCoords = fromLonLat([30.3, 59.94])

const MapPage: React.FC = () => {
	return (
		<FetchMapDataContainer>
			<MapPageLayout>
				<MapInstance
					initialCenterCoords={initialCenterCoords}
					initialZoom={initialZoom}
				/>
			</MapPageLayout>
		</FetchMapDataContainer>
	)
}

export default MapPage
