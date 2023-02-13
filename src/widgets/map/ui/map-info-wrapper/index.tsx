import { Box, Stack } from '@mui/material'

import { useAppSelector } from 'shared/model'
import { MapRowData } from 'entities/map'
import { ClearMapInfo } from 'features/map'

export const MapInfoWrapper = () => {
	const infoData = useAppSelector((state) => state.mapinfo.data)
	const status = useAppSelector((state) => state.mapinfo.status)
	const errorMsg = useAppSelector((state) => state.mapinfo.errorMsg)

	const renderContent = () => {
		if (status === 'loading') {
			return <div>Loading...</div>
		}

		if (status === 'error') {
			return <div>{errorMsg}</div>
		}

		if (status === undefined) {
			return null
		}

		if (!infoData || !infoData.length) {
			return <div>Data not found</div>
		}

		return (
			<Stack spacing={1}>
				{infoData?.map((data) => (
					<MapRowData key={data.id} data={data} />
				))}
			</Stack>
		)
	}

	return (
		<Box
			sx={{
				height: '100%',
				overflow: 'hidden',
				position: 'relative',
			}}
		>
			<Box sx={{ height: '100%', overflow: 'auto' }}>
				<Box sx={{ p: 3 }}>{renderContent()}</Box>
			</Box>

			<Box
				sx={{
					position: 'absolute',
					display: 'inline',
					left: '24px',
					bottom: '15px',
				}}
			>
				<ClearMapInfo />
			</Box>
		</Box>
	)
}
