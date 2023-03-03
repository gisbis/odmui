import { PropsWithChildren, useCallback } from 'react'
import { Box } from '@mui/material'

import { WithSidebarsLayout, FullScreenPageLayout } from 'shared/ui'
import { useAppSelector } from 'shared/model'
import { theme } from 'shared/theme'
import { DEFAULT_SIDEBAR_WIDTH } from 'shared/config'

import { mapSelectors } from 'widgets/map'

import { LayerSwitcherWrapper } from '../../layer-switcher'
import { SymbolsWrapper } from '../../symbols'
import { Bio } from '../../bio'
import { ClearData, MapData } from '../../map-data'

export const MapPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const rightSidebarData = useAppSelector(mapSelectors.selectRightSidebarData)
	const leftSidebarData = useAppSelector(mapSelectors.selectLeftSidebarData)
	const mapOnLoadEnd = useAppSelector(mapSelectors.selectMapOnLoadEnd)

	const renderLeftSidebarContent = useCallback(() => {
		if (!mapOnLoadEnd) {
			return null
		}

		if (leftSidebarData.contentType === 'home-screen') {
			return (
				<Box
					sx={{
						height: '100%',
						overflowY: 'auto',
					}}
				>
					<Box sx={{ py: 2, px: 2, mt: '80px' }}>
						<Bio />
					</Box>
				</Box>
			)
		}

		if (leftSidebarData.contentType === 'map-data') {
			return (
				<Box
					sx={{
						height: '100%',
						overflowY: 'auto',
					}}
				>
					<Box sx={{ pb: 2, pt: 0.5, px: 2, mt: '80px' }}>
						<MapData />
					</Box>
				</Box>
			)
		}

		return null
	}, [leftSidebarData.contentType, mapOnLoadEnd])

	const renderRightSidebarContent = useCallback(() => {
		if (!mapOnLoadEnd) {
			return null
		}

		if (rightSidebarData.contentType === 'layer-switcher') {
			return (
				<Box
					sx={{
						height: '100%',
						overflow: 'hidden',
					}}
				>
					<LayerSwitcherWrapper />
				</Box>
			)
		}

		if (rightSidebarData.contentType === 'symbol-list') {
			return (
				<Box
					sx={{
						height: '100%',
						overflow: 'auto',
					}}
				>
					<SymbolsWrapper />
				</Box>
			)
		}

		return null
	}, [rightSidebarData.contentType, mapOnLoadEnd])

	const props = {
		leftSidebarWidth: DEFAULT_SIDEBAR_WIDTH,
		rightSidebarWidth: DEFAULT_SIDEBAR_WIDTH,
		leftSidebarComponent: renderLeftSidebarContent(),
		rightSidebarComponent: renderRightSidebarContent(),
		isOpenRightSidebar: rightSidebarData.isOpen,
		isOpenLeftSidebar: leftSidebarData.isOpen,
	}

	return (
		<FullScreenPageLayout>
			<WithSidebarsLayout {...props}>{children}</WithSidebarsLayout>
		</FullScreenPageLayout>
	)
}
