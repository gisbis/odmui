import { Stack, Typography } from '@mui/material'

import { useAppSelector } from 'shared/model'
import { SelectData } from './select-data'

export const MapData = () => {
	const mapInfoData = useAppSelector((state) => state.map.mapInfoData) || []

	if (!mapInfoData.length) {
		return <Typography variant="body1">Data not found</Typography>
	}

	return (
		<Stack spacing={1.5}>
			{mapInfoData.map((dataRow, index) => (
				<SelectData
					key={dataRow.id}
					dataRow={dataRow}
					idx={index}
					isExpanded={mapInfoData.length === 1}
				/>
			))}
		</Stack>
	)
}

export { ClearData } from './clear-data'
