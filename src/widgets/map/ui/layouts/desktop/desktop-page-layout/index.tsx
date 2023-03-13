import { PropsWithChildren, useCallback } from 'react'
import { Box } from '@mui/material'

import { FullScreenPageLayout, WithSidebarsLayout } from 'shared/ui'
import { useAppSelector } from 'shared/model'
import { DEFAULT_SIDEBAR_WIDTH } from 'shared/config'

import { mapSelectors } from 'widgets/map'

import { LayerSwitcherWrapper } from '../../../layer-switcher'
import { SymbolsWrapper } from '../../../symbols'
import { Bio } from '../../../bio'
import { MapData } from '../../../map-data'
import { DesktopGlobalSearch } from '../../../global-search'
import { ToggleLeftSidebar } from '../../../controls'

export const DesktopPageLayout: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const rightSidebarData = useAppSelector(mapSelectors.selectRightSidebarData)
	const leftSidebarData = useAppSelector(mapSelectors.selectLeftSidebarData)

	const mapOnLoadEnd = useAppSelector(mapSelectors.selectMapOnLoadEnd)

	const renderLeftSidebarContent = useCallback(() => {
		if (!mapOnLoadEnd) {
			return null
		}

		return (
			<Box
				sx={{
					height: '100%',
					overflowY: 'auto',
				}}
			>
				<Box sx={{ pb: 3, pt: 0.5, px: 3, mt: '80px' }}>
					{leftSidebarData.contentType === 'home-screen' && <Bio />}
					{leftSidebarData.contentType === 'map-data' && <MapData />}
				</Box>
			</Box>
		)
	}, [leftSidebarData.contentType, mapOnLoadEnd])

	const renderRightSidebarContent = useCallback(() => {
		if (!mapOnLoadEnd) {
			return null
		}

		return (
			<Box
				sx={{
					height: '100%',
					overflowY: 'auto',
				}}
			>
				<Box sx={{ p: 3 }}>
					{rightSidebarData.contentType === 'layer-switcher' && (
						<LayerSwitcherWrapper />
					)}
					{rightSidebarData.contentType === 'symbol-list' && <SymbolsWrapper />}
				</Box>
			</Box>
		)
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
		<>
			<Box
				sx={{
					position: 'absolute',
					top: '0',
					left: '0',
					zIndex: 2,
					width: DEFAULT_SIDEBAR_WIDTH,
				}}
			>
				<Box sx={{ px: 3, py: '1rem' }}>
					<DesktopGlobalSearch />
				</Box>

				<Box
					sx={{
						position: 'absolute',
						right: '-64px',
						top: 'calc(1rem + 5px)',
					}}
				>
					<ToggleLeftSidebar />
				</Box>
			</Box>

			<FullScreenPageLayout>
				<WithSidebarsLayout {...props}>{children}</WithSidebarsLayout>
			</FullScreenPageLayout>
		</>
	)
}
