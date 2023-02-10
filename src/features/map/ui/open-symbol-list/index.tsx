import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { MapIconButton } from 'shared/ui/buttons'
import { mapActions } from 'entities/map/model'
import { useCallback } from 'react'

export const ViewMapSymbols: React.FC = () => {
	const dispatch = useAppDispatch()

	const isOpen = useAppSelector((state) => state.map.isOpenRightsSidebar)
	const sidebarType = useAppSelector((state) => state.map.rightSidebarType)

	const handleOnClick = useCallback(() => {
		if (sidebarType === 'symbol-list') {
			dispatch(mapActions.setIsOpenRightSidebar(!isOpen))
			return
		}

		dispatch(mapActions.setRightSidebarType('symbol-list'))
		dispatch(mapActions.setIsOpenRightSidebar(true))
	}, [isOpen, sidebarType])

	return (
		<MapIconButton onClick={handleOnClick}>
			<QuestionMarkIcon />
		</MapIconButton>
	)
}
