import { PropsWithChildren, useCallback } from 'react'
import { Box } from '@mui/material'

import { WithSidebarsLayout, FullScreenPageLayout } from 'shared/ui'
import { useAppSelector } from 'shared/model'
import { theme } from 'shared/theme'

import { LayerSwitcherWrapper } from '../../layer-switcher'
import { SymbolsWrapper } from '../../symbols'
import { Bio } from '../../bio'
import { ClearData, MapDataWrapper } from '../../map-data'

export const MapPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const isOpenLeftSidebar = useAppSelector(
		(state) => state.map.isOpenLeftSidebar
	)
	const isOpenRightSidebar = useAppSelector(
		(state) => state.map.isOpenRightSidebar
	)
	const leftSidebarContentType = useAppSelector(
		(state) => state.map.leftSidebarContentType
	)
	const rightSidebarContentType = useAppSelector(
		(state) => state.map.rightSidebarContentType
	)

	const renderLeftSidebarContent = useCallback(() => {
		if (leftSidebarContentType === 'home-screen') {
			return (
				<Box sx={{ height: '100%', overflowY: 'auto' }}>
					<Box sx={{ p: 3 }}>
						<Bio />
					</Box>
				</Box>
			)
		}

		if (leftSidebarContentType === 'map-data') {
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
					<Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
						<MapDataWrapper />
					</Box>

					<Box sx={{ p: 3 }}>
						<ClearData />
					</Box>
				</Box>
			)
		}

		return null
	}, [leftSidebarContentType])

	const renderRightSidebarContent = useCallback(() => {
		if (rightSidebarContentType === 'layer-switcher') {
			return (
				<Box
					sx={{
						height: '100%',
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<LayerSwitcherWrapper />
				</Box>
			)
		}

		if (rightSidebarContentType === 'symbol-list') {
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
	}, [rightSidebarContentType])

	const props = {
		leftSidebarWidth: 415,
		rightSidebarWidth: 415,
		leftSidebarComponent: renderLeftSidebarContent(),
		rightSidebarComponent: renderRightSidebarContent(),
		isOpenRightSidebar,
		isOpenLeftSidebar,
	}

	return (
		<FullScreenPageLayout>
			<WithSidebarsLayout {...props}>{children}</WithSidebarsLayout>
		</FullScreenPageLayout>
	)
}
