import { createTheme } from '@mui/material'
import {
	BUTTON_BORDER_RADIUS,
	CARD_BORDER_RADIUS,
	INPUT_BORDER_RADIUS,
} from 'shared/config'

export const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: BUTTON_BORDER_RADIUS,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: CARD_BORDER_RADIUS,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					borderRadius: INPUT_BORDER_RADIUS,
				},
			},
		},
	},
	palette: {
		primary: {
			main: '#606FA8',
			light: '#606FA820',
		},
		info: {
			main: '#5DA1C9',
			light: '#5DA1C925',
		},
	},
})
