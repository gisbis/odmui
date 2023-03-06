import React from 'react'
import {
	Box,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'

import type { ISelectRecord, ISelectUserField } from 'shared/api/select'
import { parsersLib } from 'shared/lib'

const StyledTableRow = styled(TableRow)(() => ({
	td: {
		padding: '10px 0',
	},
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
		parsersLib.clearString(record['f' + idField] || '')

	return (
		<TableContainer>
			<Table size="small">
				<TableBody>
					{userFields.map(
						(field) =>
							getValue(record, +field.id) !== '' && (
								<StyledTableRow key={field.id}>
									<TableCell align="left">
										<Box>
											<Typography
												variant="body2"
												fontWeight={700}
												sx={{ marginBottom: '2.5px' }}
											>
												{field.name}
											</Typography>
										</Box>

										<Typography
											variant="body1"
											color="text.secondary"
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
