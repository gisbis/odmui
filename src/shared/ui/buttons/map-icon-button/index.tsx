import { Button, ButtonProps, styled } from '@mui/material'

export const MapIconButton = styled(Button)<ButtonProps>(({ theme }) => ({
	'&:hover': {
		backgroundColor: '#ffffff',
		color: theme.palette.primary.main,
		borderColor: theme.palette.divider,
	},
	color: theme.palette.text.primary,
	minWidth: '40px',
	height: '40px',
	borderRadius: '12px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#ffffff',
	borderColor: theme.palette.divider,
	zIndex: 1,
}))
