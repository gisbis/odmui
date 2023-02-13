import { Button } from '@mui/material'

import { mapActions } from 'entities/map'
import { useAppDispatch, useAppSelector } from 'shared/model'

export const UncheckAll = () => {
	const dispatch = useAppDispatch()
	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)

	const handleClick = () => {
		dispatch(mapActions.setActiveIdLayerList([]))
	}
	return (
		<Button onClick={handleClick} disabled={!activeIdLayerList.length}>
			uncheck
		</Button>
	)
}
