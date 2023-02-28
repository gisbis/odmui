import { IconButton } from '@mui/material'
import MapIcon from '@mui/icons-material/Map'

export const GeomOnMap: React.FC<{ handleGeomOnMapClick: () => void }> = ({
	handleGeomOnMapClick,
}) => {
	const handleClick = (evt: React.MouseEvent) => {
		evt.stopPropagation()
		handleGeomOnMapClick()
	}

	return (
		<IconButton size="small" aria-label="share" onClick={handleClick}>
			<MapIcon sx={{ fontSize: '16px' }} />
		</IconButton>
	)
}
