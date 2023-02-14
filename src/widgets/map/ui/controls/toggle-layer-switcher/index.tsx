import { useCallback } from 'react'

import LayersIcon from '@mui/icons-material/Layers'

import { useAppSelector, useAppDispatch } from 'shared/model'
import { MapIconButton } from 'shared/ui'

import { mapActions } from '../../../model'

export const ToggleLayerSwitcher = () => {
	const dispatch = useAppDispatch()

	const isOpen = useAppSelector((state) => state.map.isOpenRightSidebar)
	const contentType = useAppSelector(
		(state) => state.map.rightSidebarContentType
	)

	const handleOnClick = useCallback(() => {
		if (contentType === 'layer-switcher') {
			dispatch(mapActions.setIsOpenRightSidebar(!isOpen))
			return
		}

		dispatch(mapActions.setRightSidebarContentType('layer-switcher'))
		dispatch(mapActions.setIsOpenRightSidebar(true))
	}, [isOpen, contentType])

	return (
		<MapIconButton onClick={handleOnClick}>
			<LayersIcon />
		</MapIconButton>
	)
}
