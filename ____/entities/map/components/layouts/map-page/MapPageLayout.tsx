import React, { PropsWithChildren, useContext } from 'react'

import { Box } from '@mui/material'

import { WithSidebarLayout } from 'shared/components/layouts/with-sidebar/WithSidebarLayout'
import { FullPageLayout } from 'shared/components/layouts/full-page/FullPageLayout'

import { IMapContext, MapContext } from 'entities/map/context'

import { useAppSelector } from 'shared/model'

const SIDEBAR_WIDTH = 415

export const MapPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const { renderRightSidebarContent, renderLeftSidebarContent } = useContext(
		MapContext
	) as IMapContext
	const isOpenLeftSidebar = useAppSelector(
		(state) => state.map.isOpenLeftSidebar
	)

	const isOpenRightSidebar = useAppSelector(
		(state) => state.map.isOpenRightSidebar
	)

	return (
		<FullPageLayout>
			<WithSidebarLayout
				leftSidebarComponent={renderLeftSidebarContent()}
				rightSidebarComponent={renderRightSidebarContent()}
				isOpenLeftSidebar={isOpenLeftSidebar}
				isOpenRightSidebar={isOpenRightSidebar}
				sidebarwidth={SIDEBAR_WIDTH}
			>
				<Box sx={{ height: '100%', overflow: 'hidden' }}>{children}</Box>
			</WithSidebarLayout>
		</FullPageLayout>
	)
}
