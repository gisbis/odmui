import { ThemeProvider } from '@mui/material'
import { theme } from 'shared/theme'

export const withTheme = (Component: new () => React.Component) => () => {
	return (
		<ThemeProvider theme={theme}>
			<Component />
		</ThemeProvider>
	)
}
