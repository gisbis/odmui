import SquareFootIcon from '@mui/icons-material/SquareFoot'

import { MapIconButton } from 'shared/ui/buttons'

import type { MeasureModeType } from 'widgets/map/api'

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
		<MapIconButton disabled={isActive} onClick={handleClick}>
			<SquareFootIcon />
		</MapIconButton>
	)
}
