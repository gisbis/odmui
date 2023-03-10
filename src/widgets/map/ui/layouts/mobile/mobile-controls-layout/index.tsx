import { Box } from '@mui/material'

import {
	Measure,
	MobileToggleLayerSwitcher,
	MobileToggleCRFFilterSearch,
	MobileToggleSymbolList,
	ToggleLeftSidebar,
} from '../../../controls'
import { CurrentLocation } from 'widgets/map/ui/controls/current-location'

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
				<ToggleLeftSidebar />
				<CurrentLocation />
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
				<MobileToggleCRFFilterSearch />

				<MobileToggleLayerSwitcher />

				<Measure />

				<MobileToggleSymbolList />
			</Box>
		</>
	)
}
