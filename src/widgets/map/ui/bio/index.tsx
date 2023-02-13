import { Box, Typography } from '@mui/material'

export const Bio = () => {
	return (
		<Box sx={{ height: '100%', overflowY: 'auto' }}>
			<Box sx={{ p: 3 }}>
				<Typography variant="h5">Home info</Typography>
			</Box>
		</Box>
	)
}
