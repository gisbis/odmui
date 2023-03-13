import { PropsWithChildren, useCallback, useMemo } from 'react'

import { Box, SwipeableDrawerProps } from '@mui/material'

import { FullScreenPageLayout, WithDrawerPageLayout } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'shared/model'

import { mapSelectors, mapActions } from 'widgets/map'

import { LayerSwitcherWrapper } from '../../../layer-switcher'
import { SymbolsWrapper } from '../../../symbols'
import { Bio } from '../../../bio'
import { MapData } from '../../../map-data'
import { MobileGlobalSearch } from 'widgets/map/ui/global-search'
import {
	CRFFilterResult,
	CRFFilterSearch,
} from 'widgets/map/ui/crf-data-filter'

export const MobilePageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	const drawerData = useAppSelector(mapSelectors.selectDrawerData)
	const mapOnLoadEnd = useAppSelector(mapSelectors.selectMapOnLoadEnd)
	const isOpenGlobalSearchList = useAppSelector(
		mapSelectors.selectIsOpenGlobalSearchList
	)
	const isOpenCRFFilerList = useAppSelector(
		mapSelectors.selectIsOpenCRFFilterList
	)

	const handleClose = () => {
		dispatch(mapActions.setIsOpenDrawer(false))
	}

	const handleOpen = () => {}

	const withGlobalSearch = useMemo(() => {
		return (
			drawerData.contentType === 'map-data' ||
			drawerData.contentType === 'home-screen'
		)
	}, [drawerData.contentType])

	const renderContent = useCallback(() => {
		if (!mapOnLoadEnd) {
			return null
		}

		return (
			<Box
				sx={{
					height: '100%',
					overflowY: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					rowGap: 1.5,
					py: 2,
				}}
			>
				{withGlobalSearch && <MobileGlobalSearch />}

				<Box
					sx={{
						flexGrow: 1,
						overflowY: 'auto',
						px: 2,
						display:
							withGlobalSearch && isOpenGlobalSearchList ? 'none' : 'block',
					}}
				>
					{drawerData.contentType === 'home-screen' && <Bio />}
					{drawerData.contentType === 'map-data' && <MapData />}
					{drawerData.contentType === 'symbol-list' && <SymbolsWrapper />}
					{drawerData.contentType === 'layer-switcher' && (
						<LayerSwitcherWrapper />
					)}
					{drawerData.contentType === 'crf-filter' && (
						<>
							<Box>
								<CRFFilterSearch />
							</Box>

							<Box>
								<CRFFilterResult />
							</Box>
						</>
					)}
				</Box>
			</Box>
		)
	}, [
		mapOnLoadEnd,
		drawerData.contentType,
		isOpenGlobalSearchList,
		withGlobalSearch,
	])

	const drawerProps: SwipeableDrawerProps = {
		open: drawerData.isOpen,
		anchor: 'bottom',
		onClose: handleClose,
		onOpen: handleOpen,
		PaperProps: {
			sx: {
				overflowY: 'hidden',
				maxHeight: '50vh',
				height: isOpenGlobalSearchList || isOpenCRFFilerList ? '50vh' : 'auto',
			},
		},
	}

	return (
		<FullScreenPageLayout>
			<WithDrawerPageLayout
				drawerContent={renderContent()}
				drawerProps={drawerProps}
			>
				{children}
			</WithDrawerPageLayout>
		</FullScreenPageLayout>
	)
}
