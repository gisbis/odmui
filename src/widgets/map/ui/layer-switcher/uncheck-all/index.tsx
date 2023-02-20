import { Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { mapActions } from 'widgets/map'

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
			variant="text"
			onClick={handleClick}
			disabled={!activeIdLayerList.length}
			size="small"
		>
			uncheck
		</Button>
	)
}
