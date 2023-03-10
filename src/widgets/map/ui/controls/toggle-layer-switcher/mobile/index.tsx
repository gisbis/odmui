import LayersIcon from '@mui/icons-material/Layers'

import { useAppDispatch } from 'shared/model'
import { MapIconButton } from 'shared/ui'

import { mapActions } from 'widgets/map'

export const MobileToggleLayerSwitcher = () => {
	const dispatch = useAppDispatch()

	const handleOnClick = () => {
		dispatch(mapActions.setDrawerContentType('layer-switcher'))
		dispatch(mapActions.setIsOpenDrawer(true))
	}

	return (
		<MapIconButton onClick={handleOnClick}>
			<LayersIcon />
		</MapIconButton>
	)
}
