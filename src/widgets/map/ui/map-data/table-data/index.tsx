import React from 'react'
import {
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'

import type { ISelectRecord, ISelectUserField } from 'shared/api/select'

const StyledTableRow = styled(TableRow)(() => ({
	'&:last-child td, &:last-child th': {
		border: 0,
	},
	'&:nth-of-type(even)': {
		//backgroundColor: theme.palette.action.hover,
	},
}))

export const TableData: React.FC<{
	record: ISelectRecord
	userFields: ISelectUserField[]
}> = ({ record, userFields }) => {
	const getValue = (record: ISelectRecord, idField: number) =>
		record['f' + idField] || ''

	return (
		<TableContainer>
			<Table size="small">
				<TableBody>
					{userFields.map(
						(field) =>
							getValue(record, +field.id) !== '' && (
								<StyledTableRow key={field.id}>
									<TableCell width="40%" align="right">
										<Typography variant="body2" color="text.secondary">
											{field.name}
										</Typography>
									</TableCell>

									<TableCell align="left">
										<Typography
											variant="body1"
											fontSize={14}
											sx={{
												wordBreak: 'break-word',
												whiteSpace: 'pre-line',
											}}
											dangerouslySetInnerHTML={{
												__html: getValue(record, +field.id),
											}}
										/>
									</TableCell>
								</StyledTableRow>
							)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
