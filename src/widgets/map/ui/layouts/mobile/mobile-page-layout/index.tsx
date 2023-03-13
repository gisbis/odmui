import { PropsWithChildren, useCallback, useMemo } from 'react'

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

	const { contentType, isOpen } = useAppSelector(mapSelectors.selectDrawerData)

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
		return contentType === 'map-data' || contentType === 'home-screen'
	}, [contentType])

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
					py: 2,
				}}
			>
				{withGlobalSearch && (
					<Box sx={{ px: 2 }}>
						<GlobalSearch />
					</Box>
				)}

				<Box
					sx={{
						flexGrow: 1,
						overflowY: 'auto',
						px: 2,
						py: 2,
					}}
				>
					{contentType === 'home-screen' && <Bio />}
					{contentType === 'map-data' && <MapData />}
					{contentType === 'symbol-list' && <SymbolsWrapper />}
					{contentType === 'layer-switcher' && <LayerSwitcherWrapper />}
					{contentType === 'crf-filter' && (
						<>
							<Box sx={{ mb: 1.5 }}>
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
	}, [mapOnLoadEnd, contentType, isOpenGlobalSearchList, withGlobalSearch])

	const drawerProps: SwipeableDrawerProps = {
		open: isOpen,
		anchor: 'bottom',
		onClose: handleClose,
		onOpen: handleOpen,
		PaperProps: {
			sx: {
				overflowY: 'hidden',
				maxHeight: '70vh',
				height: isOpenGlobalSearchList || isOpenCRFFilerList ? '70vh' : 'auto',
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
