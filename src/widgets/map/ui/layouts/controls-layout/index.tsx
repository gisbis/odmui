import { Box } from '@mui/material'

import {
	Measure,
	ToggleLayerSwitcher,
	ToggleLeftSidebar,
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
					width: '40px',
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
					width: '40px',
					display: 'flex',
					flexDirection: 'column',
					rowGap: 1.5,
				}}
			>
				<ToggleLayerSwitcher />
				<ZoomGroup />
				<ToggleSymbolList />
			</Box>
		</Box>
	)
}
