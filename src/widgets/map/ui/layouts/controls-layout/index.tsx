import { Box, Stack } from '@mui/material'

import {
	Measure,
	ToggleLayerSwitcher,
	ToggleLeftSidebar,
	ToggleMapDataFilter,
	ToggleSymbolList,
	ZoomGroup,
} from '../../controls'

import './index.scss'

export const MapControlsLayout = () => {
	return (
		<Box className="map-controls-layout">
			<Box
				sx={{
					position: 'absolute',
					left: '1rem',
					top: '1rem',
					width: 'auto',
					display: 'flex',
					flexDirection: 'column',
					rowGap: 1.5,
				}}
			>
				<ToggleLeftSidebar />
				<Measure />
			</Box>

			<Box
				sx={{
					position: 'absolute',
					right: '1rem',
					top: '1rem',
					width: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'end',
					rowGap: 1.5,
				}}
			>
				<ToggleMapDataFilter />

				<ToggleLayerSwitcher />

				<ZoomGroup />
				<ToggleSymbolList />
			</Box>
		</Box>
	)
}
