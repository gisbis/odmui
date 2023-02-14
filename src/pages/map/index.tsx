import { MapWidget } from 'widgets/map'
import { MapData } from 'containers'

const MapPage = () => {
	return (
		<MapData>
			<MapWidget zoom={9} coords={[30.3, 59.94]} />
		</MapData>
	)
}

export default MapPage
