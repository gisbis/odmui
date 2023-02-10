import { MapIconButtonGroup } from 'shared/ui/buttons'

import { ZoomIn } from './ZoomIn'
import { ZoomOut } from './ZoomOut'

export const ZoomGroup = () => {
	return (
		<MapIconButtonGroup orientation="vertical">
			<ZoomIn />
			<ZoomOut />
		</MapIconButtonGroup>
	)
}
