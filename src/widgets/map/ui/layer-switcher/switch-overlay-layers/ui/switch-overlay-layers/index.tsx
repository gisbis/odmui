import { useMemo } from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { LayerSwitcherGroup } from '../layer-switcher-group'

import { mapLib } from 'widgets/map'
import type { IMapLayersGroup } from 'widgets/map/lib'

import type { Layer } from 'ol/layer'
import type { Source } from 'ol/source'
import LayerRenderer from 'ol/renderer/Layer'

interface ISwitchOverlayLayersProps {
	query: string
	layerList: Layer<Source, LayerRenderer<any>>[]
}

export const SwitchOverlayLayers: React.FC<ISwitchOverlayLayersProps> = ({
	query,
	layerList,
}) => {
	const groupedLayerList: IMapLayersGroup[] = useMemo(() => {
		return mapLib.groupedMapLayers(layerList)
	}, [layerList])

	return (
		<Box>
			{!layerList.length ? (
				<Typography variant="body2">Empty layer list</Typography>
			) : (
				<Stack spacing={1}>
					{groupedLayerList.map((group) => (
						<LayerSwitcherGroup
							group={group}
							key={group.idLayerGroup}
							defaultGroupIsOpen={!!query}
						/>
					))}
				</Stack>
			)}
		</Box>
	)
}
