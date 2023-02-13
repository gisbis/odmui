import {
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'

import { theme } from 'shared/theme'
import { ISelectRecord, ISelectUserField } from 'entities/select'

const StyledTableRow = styled(TableRow)(() => ({
	'&:last-child td, &:last-child th': {
		border: 0,
	},
	'&:nth-of-type(even)': {
		//backgroundColor: theme.palette.action.hover,
	},
}))

const StyledTableCell = styled(TableCell)(() => ({
	'&:first-child': {
		paddingLeft: 0,
	},
	'&:last-child': {
		paddingRight: 0,
	},
}))

interface IMapDataRecordTableProps {
	record: ISelectRecord
	fields: ISelectUserField[]
}
export const MapDataRecordTable: React.FC<IMapDataRecordTableProps> = ({
	record,
	fields,
}) => {
	const getValue = (record: ISelectRecord, field: ISelectUserField) => {
		// @ts-ignore
		return record?.['f' + field.id]
	}

	return (
		<TableContainer>
			<Table size="small">
				<TableBody>
					{fields.map(
						(field) =>
							getValue(record, field) !== '' && (
								<StyledTableRow key={field.id}>
									<StyledTableCell align="right">
										<Typography variant="body2" color="text.secondary">
											{field.name}
										</Typography>
									</StyledTableCell>
									<StyledTableCell align="left">
										<Typography
											variant="body1"
											fontSize={14}
											sx={{
												wordBreak: 'break-word',
												whiteSpace: 'pre-line',
											}}
											dangerouslySetInnerHTML={{
												__html: getValue(record, field),
											}}
										/>
									</StyledTableCell>
								</StyledTableRow>
							)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
