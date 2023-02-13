import { MapDataContainer } from 'widgets/data-containers'
import { MapWidget } from 'widgets/map'

const MapPage = () => {
	return (
		<MapDataContainer>
			<MapWidget zoom={9} center={[30.3, 59.94]} />
		</MapDataContainer>
	)
}

export default MapPage
