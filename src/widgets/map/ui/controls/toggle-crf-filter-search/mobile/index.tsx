import FilterListIcon from '@mui/icons-material/FilterList'

import { MapIconButton } from 'shared/ui'
import { useAppDispatch } from 'shared/model'
import { mapActions } from 'widgets/map/model'

export const MobileToggleCRFFilterSearch = () => {
	const dispatch = useAppDispatch()

	const handleClick = () => {
		dispatch(mapActions.setDrawerContentType('crf-filter'))
		dispatch(mapActions.setIsOpenDrawer(true))
	}

	return (
		<MapIconButton onClick={handleClick}>
			<FilterListIcon />
		</MapIconButton>
	)
}
