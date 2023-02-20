import { useState } from 'react'
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	createTheme,
	IconButton,
	IconButtonProps,
	styled,
	ThemeProvider,
	Typography,
} from '@mui/material'

import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import type { ISelectRecord, ISelectUserField } from 'shared/api/select'

import { TableData } from '../table-data'
import { RecordDocGallery } from '../record-doc-gallery'

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

const cmpTheme = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					cursor: 'pointer',
					borderRadius: '14px',
					backgroundColor: 'white',
					borderColor: 'transparent',
					transition: 'box-shadow .1s ease-out,background-color .1s ease-out',
					'&:hover': {
						boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)',
					},
				},
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					paddingBottom: 5,
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					'&:last-child': { paddingBottom: 15 },
				},
			},
		},
		MuiCardActions: {
			styleOverrides: {
				root: {
					paddingTop: 0,
				},
			},
		},
	},
})

export const RecordData: React.FC<{
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
		<ThemeProvider theme={cmpTheme}>
			<Card
				variant="outlined"
				onClick={handleExpandClick}
				sx={{ boxShadow: expanded ? '0 2px 10px 0 rgba(0,0,0,0.2)' : 'none' }}
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
						sx={{ cursor: 'default' }}
					>
						<RecordDocGallery documents={record.doclist} />
					</CardContent>
				)}

				<CardActions disableSpacing>
					<IconButton
						size="small"
						aria-label="share"
						onClick={handleSharedClick}
					>
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
							borderTop: 1,
							borderTopStyle: 'dashed',
							borderTopColor: 'divider',
							cursor: 'default',
						}}
					>
						<TableData record={record} userFields={userFields} />
					</CardContent>
				</Collapse>
			</Card>
		</ThemeProvider>
	)
}
