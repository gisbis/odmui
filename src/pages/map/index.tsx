import { MapDataContainer } from 'widgets/data-containers'
import { MapInstance } from 'widgets/map/ui'

const MapPage = () => {
	return (
		<MapDataContainer>
			<MapInstance initialZoom={8} initialCoords={[30.3, 59.94]} />
		</MapDataContainer>
	)
}

export default MapPage
