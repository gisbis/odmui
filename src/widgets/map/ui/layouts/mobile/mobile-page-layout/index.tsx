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

export const MobilePageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	const rightSidebarData = useAppSelector(mapSelectors.selectRightSidebarData)
	const leftSidebarData = useAppSelector(mapSelectors.selectLeftSidebarData)
	const mapOnLoadEnd = useAppSelector(mapSelectors.selectMapOnLoadEnd)

	const handleClose = () => {
		dispatch(mapActions.setIsOpenLeftSidebar(false))
		dispatch(mapActions.setIsOpenRightSidebar(false))
	}

	const handleOpen = () => {}

	const renderContent = useCallback(() => {
		if (!mapOnLoadEnd) {
			return null
		}

		return (
			<Box
				sx={{
					height: '100%',
					overflowY: 'auto',
					p: 2,
				}}
			>
				{leftSidebarData.isOpen && (
					<Box>
						<Box mb={1.5}>
							<GlobalSearch />
						</Box>

						{renderLeftSidebarContent()}
					</Box>
				)}

				{rightSidebarData.isOpen && renderRightSidebarContent()}
			</Box>
		)
	}, [mapOnLoadEnd, rightSidebarData, leftSidebarData])

	const renderLeftSidebarContent = () => {
		if (leftSidebarData.contentType === 'home-screen') {
			return <Bio />
		}

		if (leftSidebarData.contentType === 'map-data') {
			return <MapData />
		}

		return null
	}

	const renderRightSidebarContent = () => {
		if (rightSidebarData.contentType === 'layer-switcher') {
			return <LayerSwitcherWrapper />
		}

		if (rightSidebarData.contentType === 'symbol-list') {
			return <SymbolsWrapper />
		}

		return null
	}

	const drawerProps: SwipeableDrawerProps = {
		open: rightSidebarData.isOpen || leftSidebarData.isOpen,
		anchor: 'bottom',
		onClose: handleClose,
		onOpen: handleOpen,
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
