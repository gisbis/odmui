import { useAppSelector } from 'shared/model'
import { getSettingById } from 'shared/settings'

import { MapWidget } from 'widgets/map'
import { MapData } from 'containers'

const MapPage = () => {
	const zoom = useAppSelector(getSettingById(15)) || 9
	const lat = useAppSelector(getSettingById(13)) || 0
	const lng = useAppSelector(getSettingById(14)) || 0

	console.log({ zoom, lat, lng })

	return (
		<MapData>
			<MapWidget zoom={+zoom} coords={[+lng, +lat]} />
		</MapData>
	)
}

export default MapPage
