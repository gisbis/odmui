import React, { PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import { WithSidebarLayout } from 'shared/components/layouts/with-sidebar/WithSidebarLayout'
import { FullPageLayout } from 'shared/components/layouts/full-page/FullPageLayout'
import { useAppSelector } from 'shared/model'

const SIDEBAR_WIDTH = 415

export const MapPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const isOpenLeftSidebar = useAppSelector(
		(state) => state.map.isOpenLeftSidebar
	)

	const isOpenRightSidebar = useAppSelector(
		(state) => state.map.isOpenRightSidebar
	)

	return (
		<FullPageLayout>
			<WithSidebarLayout
				leftSidebarComponent={<Box>LeftSidebar</Box>}
				rightSidebarComponent={<Box>RightSidebar</Box>}
				isOpenLeftSidebar={isOpenLeftSidebar}
				isOpenRightSidebar={isOpenRightSidebar}
				sidebarwidth={SIDEBAR_WIDTH}
			>
				<Box sx={{ height: '100%', overflow: 'hidden' }}>{children}</Box>
			</WithSidebarLayout>
		</FullPageLayout>
	)
}
