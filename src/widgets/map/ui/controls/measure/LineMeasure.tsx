import StraightenIcon from '@mui/icons-material/Straighten'
import { MapIconButton } from 'shared/ui/buttons'

import type { MeasureModeType } from 'widgets/map/api'

interface ILineMeasureProps {
	cbcOnClick: (val: MeasureModeType) => void
	isActive: boolean
}

export const LineMeasure: React.FC<ILineMeasureProps> = ({
	cbcOnClick,
	isActive,
}) => {
	const handleClick = () => {
		cbcOnClick('LineString')
	}

	return (
		<MapIconButton disabled={isActive} onClick={handleClick}>
			<StraightenIcon />
		</MapIconButton>
	)
}
