import { PropsWithChildren, useCallback } from 'react'

import { WithSidebarsLayout, FullScreenPageLayout } from 'shared/ui/layouts'
import { useAppSelector } from 'shared/model'
import { MapSymbolList } from 'entities/map'

import { HomeInfo } from 'widgets/map/ui'
import { LayerList } from 'features/map/ui'

export const MapPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const isOpenLeftSidebar = useAppSelector(
		(state) => state.map.isOpenLeftSidebar
	)
	const isOpenRightsSidebar = useAppSelector(
		(state) => state.map.isOpenRightsSidebar
	)
	const leftSidebarType = useAppSelector((state) => state.map.leftSidebarType)
	const rightSidebarType = useAppSelector((state) => state.map.rightSidebarType)

	const renderLeftSidebarContent = useCallback(() => {
		if (leftSidebarType === 'home-screen') {
			return <HomeInfo />
		}

		return null
	}, [leftSidebarType])

	const renderRightSidebarContent = useCallback(() => {
		if (rightSidebarType === 'layer-switcher') {
			return <LayerList />
		}

		if (rightSidebarType === 'symbol-list') {
			return <MapSymbolList />
		}

		return null
	}, [rightSidebarType])

	return (
		<FullScreenPageLayout>
			<WithSidebarsLayout
				leftSidebarWidth={415}
				rightSidebarWidth={315}
				isOpenLeftSidebar={isOpenLeftSidebar}
				isOpenRightSidebar={isOpenRightsSidebar}
				rightSidebarComponent={renderRightSidebarContent()}
				leftSidebarComponent={renderLeftSidebarContent()}
			>
				{children}
			</WithSidebarsLayout>
		</FullScreenPageLayout>
	)
}
