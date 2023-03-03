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

import type { ISelectRecord, ISelectUserField } from 'shared/api/select'
import { theme } from 'shared/theme'

import { TableData } from '../table-data'
import { RecordDocGallery } from '../record-doc-gallery'
import { GeomOnMap } from '../geom-on-map'
import { CopyRecordUrl } from '../copy-record-url'

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

export const RecordData: React.FC<{
	record: ISelectRecord
	handleGeomOnMapClick: () => void
	handleSharedClick: () => void
	geomOnMap: boolean
	userFields: ISelectUserField[]
	isExpanded: boolean
}> = ({
	record,
	userFields,
	handleGeomOnMapClick,
	handleSharedClick,
	geomOnMap,
	isExpanded,
}) => {
	const [expanded, setExpanded] = useState(isExpanded)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Card
			variant="outlined"
			onClick={handleExpandClick}
			sx={{
				cursor: 'pointer',
				borderRadius: '14px',
				backgroundColor: 'white',
				borderColor: theme.palette.grey['300'],
				transition: 'box-shadow .1s ease-out,background-color .1s ease-out',
				'&:hover': {
					boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)',
				},
			}}
		>
			<CardHeader
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

			{!!record.doclist.length && (
				<CardContent
					onClick={(evt) => evt.stopPropagation()}
					sx={{ cursor: 'default', '&:Last-child': { pb: 2 } }}
				>
					<RecordDocGallery documents={record.doclist} />
				</CardContent>
			)}

			<CardActions disableSpacing sx={{ pt: 0 }}>
				<CopyRecordUrl handleSharedClick={handleSharedClick} />

				<GeomOnMap
					handleGeomOnMapClick={handleGeomOnMapClick}
					geomOnMap={geomOnMap}
				/>

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
						borderTop: 1,
						borderTopStyle: 'dashed',
						borderTopColor: 'divider',
						cursor: 'default',
						'&:Last-child': { pb: 2 },
					}}
				>
					<TableData record={record} userFields={userFields} />
				</CardContent>
			</Collapse>
		</Card>
	)
}
