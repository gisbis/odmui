import { Box } from '@mui/material'

import './index.scss'

interface IMapControlsLayoutProps {
	leftControls?: JSX.Element
	rightControls?: JSX.Element
}

export const MapControlsLayout: React.FC<IMapControlsLayoutProps> = ({
	leftControls,
	rightControls,
}) => {
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
				{leftControls}
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
				{rightControls}
			</Box>
		</Box>
	)
}
