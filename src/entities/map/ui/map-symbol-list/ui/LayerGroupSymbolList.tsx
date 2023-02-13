import { ILayersGroup } from './'
import { LayerSymbolList } from './LayerSymbolList'

import { Box, Stack, Typography } from '@mui/material'

export const LayerGroupSymbolList: React.FC<{ group: ILayersGroup }> = ({
	group,
}) => {
	return (
		<Box>
			<Typography variant="h6" mb={1.5} fontWeight={500}>
				{group.nameLayerGroup}
			</Typography>

			<Stack spacing={1.5}>
				{group.layers.map((layer) => (
					<LayerSymbolList layer={layer} key={layer.id} />
				))}
			</Stack>
		</Box>
	)
}
