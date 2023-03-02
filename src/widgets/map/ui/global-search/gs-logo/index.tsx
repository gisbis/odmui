import { Box } from '@mui/material'

import LogoSrc from 'shared/assets/images/gb.svg'
import { theme } from 'shared/theme'
export const GsLogo = () => {
	return (
		<Box
			sx={{
				bgcolor: theme.palette.primary.main,
				width: '42px',
				height: '42px',
				borderRadius: '50%',
			}}
		>
			<img src={LogoSrc} width="100%" />
		</Box>
	)
}
