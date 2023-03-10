import { PropsWithChildren, useCallback } from 'react'

import { Box, SwipeableDrawerProps } from '@mui/material'

import { FullScreenPageLayout, WithDrawerPageLayout } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'shared/model'

import { mapSelectors, mapActions } from 'widgets/map'

import { LayerSwitcherWrapper } from '../../../layer-switcher'
import { SymbolsWrapper } from '../../../symbols'
import { Bio } from '../../../bio'
import { MapData } from '../../../map-data'
import { GlobalSearch } from 'widgets/map/ui/global-search'
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

	const renderContent = useCallback(() => {
		if (!mapOnLoadEnd) {
			return null
		}

		const isGlobalSearch =
			drawerData.contentType === 'map-data' ||
			drawerData.contentType === 'home-screen'

		return (
			<Box
				sx={{
					height: '100%',
					overflowY: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					py: 2,
					rowGap: 1.5,
				}}
			>
				{isGlobalSearch && (
					<Box px={2}>
						<GlobalSearch />
					</Box>
				)}

				<Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2 }}>
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
	}, [mapOnLoadEnd, drawerData.contentType])

	const drawerProps: SwipeableDrawerProps = {
		open: drawerData.isOpen,
		anchor: 'bottom',
		onClose: handleClose,
		onOpen: handleOpen,
		PaperProps: {
			sx: {
				maxHeight: '80vh',
				height: isOpenGlobalSearchList || isOpenCRFFilerList ? '80vh' : 'auto',
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
