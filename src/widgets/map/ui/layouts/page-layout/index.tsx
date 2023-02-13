import { PropsWithChildren, useCallback } from 'react'
import { Box } from '@mui/material'

import { WithSidebarsLayout, FullScreenPageLayout } from 'shared/ui/layouts'
import { useAppSelector } from 'shared/model'

import { LayerSwitcher } from '../../layer-switcher'

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
			return <div>Home screen</div>
		}

		if (leftSidebarContentType === 'map-data') {
			return <div>Map info data</div>
		}

		return null
	}, [leftSidebarContentType])

	const renderRightSidebarContent = useCallback(() => {
		if (rightSidebarContentType === 'layer-switcher') {
			return (
				<Box>
					<LayerSwitcher />
				</Box>
			)
		}

		if (rightSidebarContentType === 'symbol-list') {
			return <div>Symbol list</div>
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
