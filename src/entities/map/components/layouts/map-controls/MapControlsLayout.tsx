import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const MapControlsLayout: React.FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 15,
				right: 15,
				bottom: 15,
				minWidth: 450,
				zIndex: 'auto',
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'end',
				rowGap: 1,
				columnGap: 1,
			}}
		>
			{children}
		</Box>
	)
}
