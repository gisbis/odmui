import ClearIcon from '@mui/icons-material/Clear'

import { useAppDispatch } from 'shared/model'
import { mapActions } from 'widgets/map'
import { MapIconButton } from 'shared/ui'

export const ClearData = () => {
	const dispatch = useAppDispatch()

	const handleClick = () => {
		dispatch(mapActions.setMapinfoData(null))
		dispatch(mapActions.setInfoMapGeoms(null))
		dispatch(mapActions.setLeftSidebarContentType('home-screen'))
	}

	return (
		<MapIconButton onClick={handleClick} sx={{ boxShadow: 'none' }}>
			<ClearIcon />
		</MapIconButton>
	)
}
