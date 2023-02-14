import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { MapIconButton } from 'shared/ui'

import { mapActions } from '../../../model'

export const ToggleLeftSidebar: React.FC = () => {
	const dispatch = useAppDispatch()

	const isOpen = useAppSelector((state) => state.map.isOpenLeftSidebar)

	const handleOnClick = () => {
		dispatch(mapActions.setIsOpenLeftSidebar(!isOpen))
	}

	return (
		<MapIconButton onClick={handleOnClick}>
			{isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
		</MapIconButton>
	)
}