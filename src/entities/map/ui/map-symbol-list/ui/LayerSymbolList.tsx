import { Box, Stack, Typography } from '@mui/material'
import { ILayer } from 'entities/map/model'

export const LayerSymbolList: React.FC<{ layer: ILayer }> = ({ layer }) => {
	return (
		<Stack>
			<Typography variant="body1" mb={1} fontWeight={500}>
				{layer.name}
			</Typography>

			{!!layer.hint ? (
				<Box
					className="symbol-hint"
					dangerouslySetInnerHTML={{ __html: layer.hint }}
				/>
			) : (
				<Box className="symbol-wsimg">
					<img
						src={`../gisbis/MapProxy/layer${
							layer.id
						}?service=wms&request=GetLegendGraphic&format=image/png&width=50&height=50&layer=${
							layer.WMSName
						}&legend_options=forceLabels:on;fontName:Arimo%20;fontAntiAliasing:true;fontSize:15${
							!!layer.legendStyle ? `?style=${layer.legendStyle}` : ''
						}`}
					/>
				</Box>
			)}
		</Stack>
	)
}
