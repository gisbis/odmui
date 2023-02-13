import { useState } from 'react'
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	IconButtonProps,
	styled,
	Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ShareIcon from '@mui/icons-material/Share'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching'

import { ISelectRecord, ISelectUserField } from 'entities/select'

import { MapDataRecordTable } from './MapDataRecordTable'
import { theme } from 'shared/theme'

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props
	return <IconButton {...other} />
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}))

interface IMapDataRecordProps {
	record: ISelectRecord
	fields: ISelectUserField[]
}
export const MapDataRecord: React.FC<IMapDataRecordProps> = ({
	record,
	fields,
}) => {
	const [expanded, setExpanded] = useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Card variant="outlined" sx={{ borderRadius: '8px' }}>
			<CardHeader
				sx={{ cursor: 'pointer', pb: 1.5 }}
				onClick={handleExpandClick}
				title={
					<Typography
						variant="body1"
						fontSize={16}
						lineHeight={1.2}
						color={expanded ? theme.palette.primary.main : 'inherit'}
					>
						{record.metaName}
					</Typography>
				}
			></CardHeader>

			<CardActions disableSpacing sx={{ pt: 0 }}>
				<IconButton size="small" aria-label="show on map">
					<LocationSearchingIcon fontSize="small" />
				</IconButton>

				<IconButton size="small" aria-label="share">
					<ShareIcon fontSize="small" />
				</IconButton>

				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					size="small"
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon sx={{ fontSize: '24px' }} />
				</ExpandMore>
			</CardActions>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent sx={{ '&:last-child': { pb: 2 } }}>
					<MapDataRecordTable record={record} fields={fields} />
				</CardContent>
			</Collapse>
		</Card>
	)
}
