import FilterListIcon from '@mui/icons-material/FilterList'
import { Fade, Paper, PaperProps, Popper, styled } from '@mui/material'
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state'

import { MapIconButton } from 'shared/ui'

import { MapDataFilter } from '../../map-data-filter'

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
	'&:hover': {
		boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)',
	},
	borderRadius: '12px',
	backgroundColor: '#ffffff',
	borderColor: theme.palette.divider,
	boxShadow: '0 2px 6px 0 rgba(0,0,0,0.2)',
	transition: 'box-shadow .1s ease-out,background-color .1s ease-out',
	position: 'relative',
	marginRight: 10,
	padding: 10,
	'&:before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		top: 14,
		right: 0,
		width: 10,
		height: 10,
		backgroundColor: theme.palette.background.paper,
		transform: 'translateX(50%) rotate(45deg)',
		zIndex: 0,
	},
}))

export const ToggleMapDataFilter: React.FC = () => {
	return (
		<PopupState variant="popper" popupId="data-filter-popper">
			{(popupState) => (
				<div>
					<MapIconButton {...bindToggle(popupState)}>
						<FilterListIcon />
					</MapIconButton>

					<Popper
						{...bindPopper(popupState)}
						transition
						placement="left-start"
						disablePortal={true}
						sx={{ zIndex: 2 }}
					>
						{({ TransitionProps }) => (
							<Fade {...TransitionProps} timeout={350}>
								<StyledPaper>
									<MapDataFilter />
								</StyledPaper>
							</Fade>
						)}
					</Popper>
				</div>
			)}
		</PopupState>
	)
}
