import { ThemeProvider } from '@mui/material'
import { theme } from './mui'

export const withTheme = (component: () => React.ReactNode) => () => {
	return <ThemeProvider theme={theme}>{component()}</ThemeProvider>
}
