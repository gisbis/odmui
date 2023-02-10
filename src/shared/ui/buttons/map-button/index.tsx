import { Button, createTheme, ThemeProvider } from '@mui/material'

const buttonTheme = createTheme({
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

interface IMapButtonProps {
	cbcOnClick: () => void
	icon: JSX.Element
	disabled?: boolean
}

export const MapButton: React.FC<IMapButtonProps> = ({
	cbcOnClick,
	icon,
	disabled,
}) => {
	return (
		<ThemeProvider theme={buttonTheme}>
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
