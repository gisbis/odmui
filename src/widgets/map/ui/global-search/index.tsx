import { Box, Card, CardContent, Stack } from '@mui/material'

import { DEFAULT_SIDEBAR_WIDTH } from 'shared/config'
import { BaseInput } from 'shared/ui'

import Logo from 'shared/assets/images/gb_3.svg'

import { ToggleLeftSidebar } from '../controls'
export const GlobalSearch = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: '0',
				left: '0',
				zIndex: 2,
				width: DEFAULT_SIDEBAR_WIDTH,
			}}
		>
			<Box
				sx={{
					px: 3,
					py: '1rem',
				}}
			>
				<Card
					variant="outlined"
					sx={{ borderRadius: '14px', borderColor: 'transparent' }}
				>
					<Stack direction="row" alignItems="center" sx={{ pr: 1 }}>
						<img src={Logo} width={50} height={50} />

						<BaseInput placeholder="Search..." />

						<ToggleLeftSidebar />
					</Stack>
				</Card>
			</Box>
		</Box>
	)
}
