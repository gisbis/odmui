import { useAppSelector } from 'shared/model'
import { userSelectors } from 'entities/user'

import { MapWidget } from 'widgets/map'

const MapPage = () => {
	const zoom = useAppSelector(userSelectors.getSettingById(15)) || 9
	const lat = useAppSelector(userSelectors.getSettingById(13)) || 0
	const lng = useAppSelector(userSelectors.getSettingById(14)) || 0

	return <MapWidget zoom={+zoom} coords={[+lng, +lat]} />
}

export default MapPage
