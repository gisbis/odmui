import { useAppSelector } from 'shared/model'
import { getSettingById } from 'entities/user'

import { MapWidget } from 'widgets/map'

const MapPage = () => {
	console.log('render map page')

	const zoom = useAppSelector(getSettingById(15)) || 9
	const lat = useAppSelector(getSettingById(13)) || 0
	const lng = useAppSelector(getSettingById(14)) || 0

	return <MapWidget zoom={+zoom} coords={[+lng, +lat]} />
}

export default MapPage
