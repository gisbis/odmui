import { useAppSelector } from 'shared/model'
import { Stack, Typography } from '@mui/material'

import { MapDataRow } from '../map-data-row'

export const MapDataWrapper = () => {
	const mapInfoData = useAppSelector((state) => state.map.mapInfoData) || []

	if (!mapInfoData.length) {
		return <Typography variant="body1">Data not found</Typography>
	}

	return (
		<Stack spacing={1.5}>
			{mapInfoData.map((dataRow) => (
				<MapDataRow key={dataRow.id} dataRow={dataRow} />
			))}
		</Stack>
	)
}
