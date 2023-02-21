import { createTheme } from '@mui/material'

export const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '14px',
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
