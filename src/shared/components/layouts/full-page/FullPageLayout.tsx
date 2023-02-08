import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const FullPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Box
			sx={{
				height: '100%',
				overflow: 'hidden',
			}}
		>
			{children}
		</Box>
	)
}
