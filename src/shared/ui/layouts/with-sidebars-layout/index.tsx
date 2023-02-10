import { PropsWithChildren } from 'react'

import { Box, styled } from '@mui/material'
import { DEFAULT_SIDEBAR_WIDTH } from './config'

const Main = styled('main', {
	shouldForwardProp: (prop) =>
		prop !== 'openleftsidebar' && prop !== 'openrightsidebar',
})<{
	openleftsidebar: boolean
	openrightsidebar: boolean
}>(({ theme, openleftsidebar, openrightsidebar }) => ({
	flexGrow: 1,
	height: '100%',
	overflow: 'hidden',
	position: 'relative',
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: 0,
	...(openleftsidebar && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	marginRight: 0,
	...(openrightsidebar && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Sidebar = styled('div', {
	shouldForwardProp: (prop) =>
		prop !== 'open' && prop !== 'sidebarwidth' && prop !== 'anchor',
})<{
	open: boolean
	sidebarwidth: number
	anchor: 'left' | 'right'
}>(({ theme, open, anchor, sidebarwidth }) => ({
	width: sidebarwidth,
	minWidth: sidebarwidth,
	height: '100%',
	overflow: 'hidden',
	boxShadow:
		'rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px',
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: anchor === 'left' ? -sidebarwidth : 0,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
	marginRight: anchor === 'right' ? -sidebarwidth : 0,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	}),
}))

interface IWithSidebarsLayoutProps extends PropsWithChildren {
	leftSidebarWidth?: number
	rightSidebarWidth?: number
	isOpenRightSidebar?: boolean
	isOpenLeftSidebar?: boolean
	rightSidebarComponent?: React.ReactNode
	leftSidebarComponent?: React.ReactNode
}

export const WithSidebarsLayout: React.FC<IWithSidebarsLayoutProps> = ({
	children,
	leftSidebarWidth = DEFAULT_SIDEBAR_WIDTH,
	rightSidebarWidth = DEFAULT_SIDEBAR_WIDTH,
	isOpenLeftSidebar,
	isOpenRightSidebar,
	leftSidebarComponent,
	rightSidebarComponent,
}) => {
	return (
		<Box
			sx={{
				height: '100%',
				flexGrow: '1',
				position: 'relative',
				overflow: 'hidden',
				display: 'flex',
			}}
		>
			<Sidebar
				open={!!isOpenLeftSidebar}
				sidebarwidth={leftSidebarWidth}
				anchor="left"
			>
				{leftSidebarComponent}
			</Sidebar>

			<Main
				openleftsidebar={!!isOpenLeftSidebar}
				openrightsidebar={!!isOpenRightSidebar}
			>
				{children}
			</Main>

			<Sidebar
				open={!!isOpenRightSidebar}
				sidebarwidth={rightSidebarWidth}
				anchor="right"
			>
				{rightSidebarComponent}
			</Sidebar>
		</Box>
	)
}
