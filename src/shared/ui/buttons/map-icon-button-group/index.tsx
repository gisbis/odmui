import {
	ButtonGroup as MUIButtonGroup,
	ButtonGroupProps,
	styled,
} from '@mui/material'

export const MapIconButtonGroup = styled(MUIButtonGroup)<ButtonGroupProps>(
	({ theme }) => ({
		color: theme.palette.text.primary,
		'&.MuiButtonGroup-vertical': {
			'& .MuiButtonGroup-grouped': {
				minWidth: '40px',
			},
		},
		'& .MuiButtonGroup-grouped': {
			minWidth: '50px',
		},
	})
)
