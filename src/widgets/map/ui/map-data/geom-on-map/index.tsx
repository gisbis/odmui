import { IconButton } from '@mui/material'
import MyLocationIcon from '@mui/icons-material/MyLocation'

export const GeomOnMap: React.FC<{
	handleGeomOnMapClick: () => void
	geomOnMap: boolean
}> = ({ handleGeomOnMapClick, geomOnMap }) => {
	const handleClick = (evt: React.MouseEvent) => {
		evt.stopPropagation()
		handleGeomOnMapClick()
	}

	return (
		<IconButton
			size="small"
			aria-label="share"
			onClick={handleClick}
			color={geomOnMap ? 'info' : 'default'}
		>
			<MyLocationIcon fontSize="small" />
		</IconButton>
	)
}
