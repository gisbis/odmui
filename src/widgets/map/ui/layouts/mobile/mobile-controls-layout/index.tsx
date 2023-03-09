import { Box } from '@mui/material'

import {
	Measure,
	ToggleLayerSwitcher,
	ToggleCRFFilterSearch,
	ToggleSymbolList,
} from '../../../controls'

export const MobileControlsLayout = () => {
	return (
		<>
			<Box
				sx={{
					position: 'absolute',
					left: '1rem',
					top: '1rem',
					width: 'auto',
					display: 'flex',
					flexDirection: 'column',
					rowGap: 2,
				}}
			>
				<Measure />
			</Box>

			<Box
				sx={{
					position: 'absolute',
					right: '1rem',
					top: '1rem',
					width: '50px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'end',
					rowGap: 2,
				}}
			>
				<ToggleCRFFilterSearch />

				<ToggleLayerSwitcher />
				<ToggleSymbolList />
			</Box>
		</>
	)
}
