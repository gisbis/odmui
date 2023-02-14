import { Button } from '@mui/material'
import { mapActions } from '../../../model'
import { useAppDispatch } from 'shared/model'

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
