import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { MapControl } from 'entities/map/components/map-control/MapControl'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { mapActions } from 'entities/map/model'

export const ToggleRightSidebar: React.FC = () => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.map.isOpenRightSidebar)

	const handleOnClick = () => {
		dispatch(mapActions.setIsOpenRightSidebar(!isOpen))
	}
	return <MapControl cbcOnClick={handleOnClick} icon={<ArrowRightIcon />} />
}
