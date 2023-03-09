import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const FullScreenPageLayout: React.FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<Box
			sx={{
				position: 'relative',
				height: '100%',
				overflow: 'hidden',
			}}
		>
			{children}
		</Box>
	)
}
