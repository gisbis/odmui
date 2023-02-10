import RemoveIcon from '@mui/icons-material/Remove'
import { Zoom } from 'features/map/components/map-controls/zoom/Zoom'

export const ZoomOut = () => {
	return <Zoom icon={<RemoveIcon />} delta={-1} />
}
