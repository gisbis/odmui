import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { MapIconButton } from 'shared/ui'
import { useIsBreakpoint } from 'shared/hooks'
import { BREAKPOINTS } from 'shared/config'

import { mapActions } from 'widgets/map'
import { selectDrawerData } from 'widgets/map/model/selectors'

export const ToggleLeftSidebar: React.FC = () => {
	const dispatch = useAppDispatch()
	const isMobile = useIsBreakpoint(BREAKPOINTS.mobile)

	const isOpen = useAppSelector((state) => state.map.isOpenLeftSidebar)

	const drawerData = useAppSelector(selectDrawerData)

	const handleOnClick = () => {
		dispatch(mapActions.setIsOpenLeftSidebar(!isOpen))

		dispatch(mapActions.setIsOpenDrawer(true))

		if (drawerData.contentType !== 'map-data') {
			dispatch(mapActions.setDrawerContentType('home-screen'))
		}
	}

	return (
		<MapIconButton onClick={handleOnClick}>
			{!isMobile ? (
				isOpen ? (
					<ArrowLeftIcon />
				) : (
					<ArrowRightIcon />
				)
			) : (
				<TravelExploreIcon />
			)}
		</MapIconButton>
	)
}
