import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

import { useAppDispatch } from 'shared/model'
import { MapIconButton } from 'shared/ui'

import { mapActions } from 'widgets/map'

export const MobileToggleSymbolList = () => {
	const dispatch = useAppDispatch()

	const handleOnClick = () => {
		dispatch(mapActions.setDrawerContentType('symbol-list'))
		dispatch(mapActions.setIsOpenDrawer(true))
	}

	return (
		<MapIconButton onClick={handleOnClick}>
			<QuestionMarkIcon />
		</MapIconButton>
	)
}
