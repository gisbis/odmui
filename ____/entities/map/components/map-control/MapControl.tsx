import { Box, Button, createTheme, ThemeProvider } from '@mui/material'

const iconTheme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '40px',
					height: '40px',
					borderRadius: '14px',
					minWidth: 'auto',
					fontSize: '18px',
				},
				colorInherit: {
					backgroundColor: 'white',
				},
			},
		},
	},
})

interface IMapControlProps {
	cbcOnClick: () => void
	icon: JSX.Element
	disabled?: boolean
}

export const MapControl: React.FC<IMapControlProps> = ({
	cbcOnClick,
	icon,
	disabled,
}) => {
	return (
		<ThemeProvider theme={iconTheme}>
			<Button
				sx={{ position: 'relative', zIndex: 1 }}
				disabled={disabled}
				color="inherit"
				variant="contained"
				onClick={(evt) => {
					evt.stopPropagation()
					cbcOnClick()
				}}
			>
				{icon}
			</Button>
		</ThemeProvider>
	)
}
