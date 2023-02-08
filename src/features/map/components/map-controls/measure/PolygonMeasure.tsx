import { MapControl } from 'entities/map/components/map-control/MapControl'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import { MeasureModeType } from 'features/map/components/map-controls/measure/Measure'

interface IPolygonMeasureProps {
	cbcOnClick: (val: MeasureModeType) => void
	isActive: boolean
}

export const PolygonMeasure: React.FC<IPolygonMeasureProps> = ({
	isActive,
	cbcOnClick,
}) => {
	const handleClick = () => {
		cbcOnClick('Polygon')
	}

	return (
		<MapControl
			disabled={isActive}
			cbcOnClick={handleClick}
			icon={<SquareFootIcon />}
		/>
	)
}
