import { PropsWithChildren } from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

export const AppPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}
		>
			<AppBar position="fixed">
				<Toolbar variant="dense">
					<Typography variant="h6" component="div">
						GIS BIS
					</Typography>
				</Toolbar>
			</AppBar>

			<Toolbar variant="dense" />

			<Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
				{children}
			</Box>
		</Box>
	)
}
