import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'
import { mapSelectors } from 'widgets/map/model'

import {
	Measure,
	DesktopToggleCRFFilterSearch,
	DesktopToggleSymbolList,
	ZoomGroup,
	DesktopToggleLayerSwitcher,
} from '../../../controls'

import { CRFFilterResult } from '../../../crf-data-filter'

export const DesktopControlsLayout = () => {
	const isOpenCRFFilter = useAppSelector(
		mapSelectors.selectIsOpenCRFFilterSearch
	)

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
					rowGap: 1,
				}}
			>
				<DesktopToggleCRFFilterSearch />

				{isOpenCRFFilter && (
					<Box
						sx={{
							maxWidth: '276px',
							bgcolor: '#ffffff70',
							backdropFilter: 'blur(5px)',
							p: 1.5,
							borderRadius: '14px',
							boxShadow: '0 2px 6px 0 rgba(0,0,0,0.2)',
						}}
					>
						<CRFFilterResult />
					</Box>
				)}
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
				<DesktopToggleLayerSwitcher />
				<ZoomGroup />
				<Measure />
				<DesktopToggleSymbolList />
			</Box>
		</>
	)
}
