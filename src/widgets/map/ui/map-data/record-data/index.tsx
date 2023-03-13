import { useMemo, useState } from 'react'
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
import { parsersLib } from 'shared/lib'

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

	const galleryDocList = useMemo(() => {
		return record.doclist.filter((i) => !!i.hasPreview)
	}, [record])

	const listDocList = useMemo(() => {
		return record.doclist.filter((i) => !i.hasPreview)
	}, [record])

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
			}}
		>
			<CardHeader
				title={
					<Typography
						variant="body1"
						fontWeight={500}
						dangerouslySetInnerHTML={{
							__html: parsersLib.clearString(record.metaName),
						}}
						sx={{
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						}}
					/>
				}
			/>

			{!!galleryDocList.length && (
				<CardContent
					onClick={(evt) => evt.stopPropagation()}
					sx={{ cursor: 'default', '&:Last-child': { pb: 2 } }}
				>
					<RecordDocGallery documents={galleryDocList} />
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

				{!!listDocList.length && (
					<CardContent
						onClick={(evt) => evt.stopPropagation()}
						sx={{ cursor: 'default', '&:Last-child': { pb: 2 } }}
					>
						{listDocList.length}
					</CardContent>
				)}
			</Collapse>
		</Card>
	)
}
