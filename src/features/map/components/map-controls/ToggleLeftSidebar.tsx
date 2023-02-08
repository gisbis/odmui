import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import { MapControl } from 'entities/map/components/map-control/MapControl'

import { mapActions } from 'entities/map/model'
import { useAppDispatch, useAppSelector } from 'shared/model'

export const ToggleLeftSidebar: React.FC = () => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.map.isOpenLeftSidebar)

	const handleOnClick = () => {
		dispatch(mapActions.setIsOpenLeftSidebar(!isOpen))
	}

	return <MapControl cbcOnClick={handleOnClick} icon={<ArrowLeftIcon />} />
}
