import { ThemeProvider } from '@mui/material'
import { theme } from 'shared/theme'

export const withTheme = (component: () => React.ReactNode) => () => {
	return <ThemeProvider theme={theme}>{component()}</ThemeProvider>
}
