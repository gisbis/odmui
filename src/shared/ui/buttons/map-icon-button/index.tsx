import { Button, ButtonProps, styled } from '@mui/material'

export const MapIconButton = styled(Button)<ButtonProps>(({ theme }) => ({
	'&:hover': {
		backgroundColor: '#ffffff',
		color: theme.palette.primary.main,
		borderColor: theme.palette.divider,
		boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)',
	},
	color: theme.palette.text.primary,
	minWidth: '40px',
	width: '40px',
	height: '40px',
	borderRadius: '12px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#ffffff',
	borderColor: theme.palette.divider,
	boxShadow: '0 2px 6px 0 rgba(0,0,0,0.2)',
	transition: 'box-shadow .1s ease-out,background-color .1s ease-out',
	zIndex: 1,
}))
