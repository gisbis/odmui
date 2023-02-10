import { ButtonGroup } from '@mui/material'

import { ZoomIn } from './ZoomIn'
import { ZoomOut } from './ZoomOut'

export const ZoomGroup = () => {
	return (
		<ButtonGroup orientation="vertical">
			<ZoomIn />
			<ZoomOut />
		</ButtonGroup>
	)
}
