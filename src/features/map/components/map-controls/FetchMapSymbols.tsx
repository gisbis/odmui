import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

import { MapControl } from 'entities/map/components/map-control/MapControl'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { mapActions } from 'entities/map/model'

export const FetchMapSymbols: React.FC = () => {
	const dispatch = useAppDispatch()

	const handleOnClick = () => {
		dispatch(mapActions.setIsOpenRightSidebar(true))
	}

	return <MapControl cbcOnClick={handleOnClick} icon={<QuestionMarkIcon />} />
}
