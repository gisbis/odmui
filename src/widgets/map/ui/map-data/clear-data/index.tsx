import { Button } from '@mui/material'

import { useAppDispatch } from 'shared/model'
import { mapActions } from 'widgets/map'

export const ClearData = () => {
	const dispatch = useAppDispatch()

	const handleClick = () => {
		dispatch(mapActions.setMapinfoData(null))
		dispatch(mapActions.setLeftSidebarContentType('home-screen'))
	}

	return (
		<Button variant="contained" onClick={handleClick}>
			Clear
		</Button>
	)
}
