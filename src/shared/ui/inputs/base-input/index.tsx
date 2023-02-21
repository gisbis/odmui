import { styled } from '@mui/material'

export const BaseInput = styled('input')(({ theme }) => ({
	height: 40,
	width: '100%',
	fontFamily: 'Roboto',
	fontSize: '1rem',
	backgroundColor: 'white',
	border: 'none',
	outline: 'none',
	padding: 0,
	'&:hover': {
		border: 'none',
		outline: 'none',
	},
}))
