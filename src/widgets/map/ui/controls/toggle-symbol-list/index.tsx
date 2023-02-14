import { useCallback } from 'react'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { MapIconButton } from 'shared/ui'

import { mapActions } from '../../../model'

export const ToggleSymbolList = () => {
	const dispatch = useAppDispatch()

	const isOpen = useAppSelector((state) => state.map.isOpenRightSidebar)
	const contentType = useAppSelector(
		(state) => state.map.rightSidebarContentType
	)

	const handleOnClick = useCallback(() => {
		if (contentType === 'symbol-list') {
			dispatch(mapActions.setIsOpenRightSidebar(!isOpen))
			return
		}

		dispatch(mapActions.setRightSidebarContentType('symbol-list'))
		dispatch(mapActions.setIsOpenRightSidebar(true))
	}, [isOpen, contentType])

	return (
		<MapIconButton onClick={handleOnClick}>
			<QuestionMarkIcon />
		</MapIconButton>
	)
}
