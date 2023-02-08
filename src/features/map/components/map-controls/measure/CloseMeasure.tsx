import { MapControl } from 'entities/map/components/map-control/MapControl'
import CloseIcon from '@mui/icons-material/Close'

interface ICloseMeasureProps {
	cbcOnClick: (val: undefined) => void
}

export const CloseMeasure: React.FC<ICloseMeasureProps> = ({ cbcOnClick }) => {
	const handleClick = () => {
		cbcOnClick(undefined)
	}

	return <MapControl cbcOnClick={handleClick} icon={<CloseIcon />} />
}
