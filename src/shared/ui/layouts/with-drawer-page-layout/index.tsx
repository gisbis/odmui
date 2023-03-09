import { PropsWithChildren } from 'react'
import { Box, SwipeableDrawer, SwipeableDrawerProps } from '@mui/material'

interface IWithDrawerPageLayoutProps extends PropsWithChildren {
	drawerContent: JSX.Element | null
	drawerProps: SwipeableDrawerProps
}

export const WithDrawerPageLayout: React.FC<IWithDrawerPageLayoutProps> = ({
	children,
	drawerContent,
	drawerProps,
}) => {
	return (
		<Box
			sx={{
				height: '100%',
				flexGrow: '1',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{children}

			<SwipeableDrawer {...drawerProps}>{drawerContent}</SwipeableDrawer>
		</Box>
	)
}
