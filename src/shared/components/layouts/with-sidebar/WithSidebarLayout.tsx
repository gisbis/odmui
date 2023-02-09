import { Box, styled } from '@mui/material'
import { PropsWithChildren } from 'react'

const Main = styled('main', {
	shouldForwardProp: (prop) =>
		prop !== 'openleftsidebar' &&
		prop !== 'openrightsidebar' &&
		prop !== 'ismobile' &&
		prop !== 'sidebarwidth',
})<{
	sidebarwidth: number
	openleftsidebar: boolean
	openrightsidebar: boolean
	ismobile: boolean
}>(({ theme, sidebarwidth, openleftsidebar, openrightsidebar, ismobile }) => ({
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
		prop !== 'open' &&
		prop !== 'ismobile' &&
		prop !== 'sidebarwidth' &&
		prop !== 'anchor',
})<{
	open: boolean
	ismobile: boolean
	sidebarwidth: number
	anchor: 'left' | 'right'
}>(({ theme, open, ismobile, anchor, sidebarwidth }) => ({
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

interface IWithSidebarLayoutProps extends PropsWithChildren {
	sidebarwidth: number
	isOpenRightSidebar?: boolean
	rightSidebarComponent?: React.ReactNode
	isOpenLeftSidebar?: boolean
	leftSidebarComponent?: React.ReactNode
	isMobile?: boolean
}

export const WithSidebarLayout: React.FC<IWithSidebarLayoutProps> = ({
	children,
	isMobile = false,
	sidebarwidth,
	isOpenLeftSidebar,
	leftSidebarComponent,
	rightSidebarComponent,
	isOpenRightSidebar,
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
				ismobile={isMobile}
				sidebarwidth={sidebarwidth}
				anchor="left"
			>
				{leftSidebarComponent}
			</Sidebar>

			<Main
				sidebarwidth={sidebarwidth}
				openleftsidebar={!!isOpenLeftSidebar}
				openrightsidebar={!!isOpenRightSidebar}
				ismobile={isMobile}
			>
				{children}
			</Main>

			<Sidebar
				open={!!isOpenRightSidebar}
				ismobile={isMobile}
				sidebarwidth={sidebarwidth}
				anchor="right"
			>
				{rightSidebarComponent}
			</Sidebar>
		</Box>
	)
}
