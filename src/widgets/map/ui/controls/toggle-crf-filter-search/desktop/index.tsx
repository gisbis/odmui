import FilterListIcon from '@mui/icons-material/FilterList'

import {
	Divider,
	Paper,
	PaperProps,
	IconButton,
	styled,
	Stack,
	Collapse,
} from '@mui/material'

import { useAppDispatch, useAppSelector } from 'shared/model'
import { mapSelectors, mapActions } from 'widgets/map'

import { CRFFilterSearch } from '../../../crf-data-filter'

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
	'&:hover': {
		boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)',
	},
	borderRadius: '14px',
	backgroundColor: '#ffffff',
	borderColor: theme.palette.divider,
	boxShadow: '0 2px 6px 0 rgba(0,0,0,0.2)',
	transition: 'box-shadow .1s ease-out,background-color .1s ease-out',
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
	zIndex: 1,
	minWidth: 40,
	height: 40,
}))

export const DesktopToggleCRFFilterSearch = () => {
	const dispatch = useAppDispatch()

	const crfUserLayers = useAppSelector(mapSelectors.selectCRFUserLayerList)
	const isOpen = useAppSelector(mapSelectors.selectIsOpenCRFFilterSearch)

	if (!crfUserLayers.length) {
		return null
	}

	return (
		<StyledPaper>
			<Collapse
				orientation="horizontal"
				in={isOpen}
				timeout="auto"
				unmountOnExit
			>
				<Stack direction="row" sx={{ width: 250, pl: 1.5 }}>
					<CRFFilterSearch />

					<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				</Stack>
			</Collapse>

			<IconButton
				color="inherit"
				aria-label="directions"
				onClick={() => dispatch(mapActions.setIsOpenCRFFilterSearch(!isOpen))}
			>
				<FilterListIcon />
			</IconButton>
		</StyledPaper>
	)
}
