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
						bgcolor: theme.palette.action.hover,
					}}
				>
					<Box sx={{ p: 3, mt: '60px' }}>
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
						overflowY: 'hidden',
						bgcolor: theme.palette.action.hover,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, mt: '60px' }}>
						<MapData />
					</Box>

					<Box sx={{ p: 3 }}>
						<ClearData />
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
						display: 'flex',
						flexDirection: 'column',
						bgcolor: theme.palette.action.hover,
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
