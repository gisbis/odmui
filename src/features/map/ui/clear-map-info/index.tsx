import { Button } from '@mui/material'

import { useAppDispatch } from 'shared/model'
import { mapActions } from 'entities/map'
import { mapInfoActions } from 'features/map/ui/get-map-info'

export const ClearMapInfo = () => {
	const dispatch = useAppDispatch()

	const handleClick = () => {
		dispatch(mapInfoActions.setData(null))
		dispatch(mapActions.setLeftSidebarType('home-screen'))
	}

	return (
		<Button variant="contained" onClick={handleClick}>
			Clear
		</Button>
	)
}
