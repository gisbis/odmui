import { MapControl } from 'entities/map/components/map-control/MapControl'
import StraightenIcon from '@mui/icons-material/Straighten'
import { MeasureModeType } from 'features/map/components/map-controls/measure/Measure'

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
		<MapControl
			disabled={isActive}
			cbcOnClick={handleClick}
			icon={<StraightenIcon />}
		/>
	)
}
