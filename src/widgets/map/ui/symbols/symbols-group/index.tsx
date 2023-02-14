import { Box, Stack, Typography } from '@mui/material'
import { ILayersGroup } from 'entities/select'
import { SymbolsLayer } from 'widgets/map/ui/symbols/symbols-layer'

export const SymbolsGroup: React.FC<{ group: ILayersGroup }> = ({ group }) => {
	return (
		<Box>
			<Typography mb={1.5} fontWeight={500} fontSize={16}>
				{group.nameLayerGroup}
			</Typography>

			<Stack spacing={1.5}>
				{group.layers.map((layer) => (
					<SymbolsLayer key={layer.id} layer={layer} />
				))}
			</Stack>
		</Box>
	)
}
