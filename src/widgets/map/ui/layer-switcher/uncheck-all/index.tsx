import { Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { mapActions } from '../../../model'

export const UncheckAll = () => {
	const dispatch = useAppDispatch()

	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)

	const handleClick = () => {
		dispatch(mapActions.setActiveIdLayerList([]))
	}
	return (
		<Button
			variant="contained"
			onClick={handleClick}
			disabled={!activeIdLayerList.length}
		>
			uncheck
		</Button>
	)
}
