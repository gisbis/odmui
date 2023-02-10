import { useDispatch } from 'react-redux'
import { useAppSelector } from 'shared/model'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'

import { MapIconButton } from 'shared/ui/buttons'
import { mapActions } from 'entities/map/model'

export const ToggleLeftSidebar: React.FC = () => {
	const dispatch = useDispatch()
	const isOpenLeftSidebar = useAppSelector(
		(state) => state.map.isOpenLeftSidebar
	)

	const handleOnClick = () => {
		dispatch(mapActions.setIsOpenLeftSidebar(!isOpenLeftSidebar))
	}

	return (
		<MapIconButton onClick={handleOnClick}>
			<ArrowLeftIcon />
		</MapIconButton>
	)
}
