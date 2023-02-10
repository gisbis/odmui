import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

export const MapControlsLayout: React.FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'end',
				position: 'absolute',
				top: '15px',
				bottom: '15px',
				right: '15px',
				bgcolor: '#ffffff30',
				zIndex: 'auto',
			}}
		>
			{children}
		</Box>
	)
}
