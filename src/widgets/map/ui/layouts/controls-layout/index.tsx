import { Box } from '@mui/material'

import {
	Measure,
	ToggleLayerSwitcher,
	ToggleLeftSidebar,
	ToggleCRFFilterSearch,
	ToggleSymbolList,
	ZoomGroup,
} from '../../controls'

import { CRFFilterResult } from '../../crf-data-filter'

export const MapControlsLayout = () => {
	return (
		<>
			<Box
				sx={{
					position: 'absolute',
					left: '1rem',
					top: '7rem',
					width: 'auto',
					display: 'flex',
					flexDirection: 'column',
					rowGap: 3,
				}}
			></Box>

			<Box
				sx={{
					position: 'absolute',
					right: 'calc(1rem + 100px)',
					top: '1rem',
					width: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'end',
					rowGap: 3,
				}}
			>
				<ToggleCRFFilterSearch />
				<CRFFilterResult />
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
					rowGap: 3,
				}}
			>
				<ToggleLayerSwitcher />

				<ZoomGroup />

				<Measure />

				<ToggleSymbolList />
			</Box>
		</>
	)
}
