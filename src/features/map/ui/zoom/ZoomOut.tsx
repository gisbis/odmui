import RemoveIcon from '@mui/icons-material/Remove'
import { Zoom } from './Zoom'

export const ZoomOut = () => {
	return <Zoom icon={<RemoveIcon />} delta={-1} />
}
