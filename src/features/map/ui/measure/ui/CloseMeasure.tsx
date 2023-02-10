import CloseIcon from '@mui/icons-material/Close'
import { MapIconButton } from 'shared/ui/buttons'

interface ICloseMeasureProps {
	cbcOnClick: (val: undefined) => void
}

export const CloseMeasure: React.FC<ICloseMeasureProps> = ({ cbcOnClick }) => {
	const handleClick = () => {
		cbcOnClick(undefined)
	}

	return (
		<MapIconButton onClick={handleClick}>
			<CloseIcon />
		</MapIconButton>
	)
}
