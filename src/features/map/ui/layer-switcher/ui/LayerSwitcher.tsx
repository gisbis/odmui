import { useAppSelector } from 'shared/model'
import { useDispatch } from 'react-redux'

import LayersIcon from '@mui/icons-material/Layers'

import { MapIconButton } from 'shared/ui/buttons'
import { mapActions } from 'entities/map/model'
import { useCallback } from 'react'

export const LayerSwitcher = () => {
	const dispatch = useDispatch()
	const isOpen = useAppSelector((state) => state.map.isOpenRightsSidebar)
	const sidebarType = useAppSelector((state) => state.map.rightSidebarType)

	const handleOnClick = useCallback(() => {
		if (sidebarType === 'layer-switcher') {
			dispatch(mapActions.setIsOpenRightSidebar(!isOpen))
			return
		}

		dispatch(mapActions.setRightSidebarType('layer-switcher'))
		dispatch(mapActions.setIsOpenRightSidebar(true))
	}, [isOpen, sidebarType])

	return (
		<MapIconButton onClick={handleOnClick}>
			<LayersIcon />
		</MapIconButton>
	)
}
