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

import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { ISelectRecord, ISelectUserField } from 'entities/select'
import { MapDataTable } from 'widgets/map/ui/map-data/map-data-table'

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

export const MapDataRecord: React.FC<{
	record: ISelectRecord
	userFields: ISelectUserField[]
}> = ({ record, userFields }) => {
	const [expanded, setExpanded] = useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	const handleSharedClick = (evt: React.MouseEvent) => {
		evt.stopPropagation()
	}

	return (
		<Card
			variant="outlined"
			onClick={handleExpandClick}
			sx={{
				cursor: 'pointer',
				borderRadius: '14px',
				bgcolor: 'white',
				borderColor: 'transparent',
				transition: 'box-shadow .1s ease-out,background-color .1s ease-out',
				boxShadow: expanded ? '0 2px 10px 0 rgba(0,0,0,0.2)' : 'none',
				'&:hover': {
					boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)',
				},
			}}
		>
			<CardHeader
				sx={{ pb: 1 }}
				title={
					<Typography
						variant="body1"
						fontWeight={500}
						dangerouslySetInnerHTML={{ __html: record.metaName }}
						sx={{
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						}}
					/>
				}
			/>

			<CardActions sx={{ pt: 0 }} disableSpacing>
				<IconButton size="small" aria-label="share" onClick={handleSharedClick}>
					<ShareIcon sx={{ fontSize: '16px' }} />
				</IconButton>

				<ExpandMore
					expand={expanded}
					size="small"
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent
					onClick={(evt) => evt.stopPropagation()}
					sx={{
						'&:last-child': { pb: 2 },
						borderTop: 1,
						borderTopStyle: 'dashed',
						borderTopColor: 'divider',
						cursor: 'default',
					}}
				>
					<MapDataTable record={record} userFields={userFields} />
				</CardContent>
			</Collapse>
		</Card>
	)
}
