import { useMemo } from 'react'
import {
	Box,
	createTheme,
	Stack,
	ThemeProvider,
	Typography,
} from '@mui/material'

import { LayerSwitcherGroup } from '../layer-switcher-group'
import { groupedMapLayers } from '../../../../../lib'
import type { IMapLayersGroup } from '../../../../../lib'

import type { Layer } from 'ol/layer'
import type { Source } from 'ol/source'
import LayerRenderer from 'ol/renderer/Layer'

const cmpTheme = createTheme({
	components: {
		MuiCheckbox: {
			styleOverrides: {
				root: {
					padding: '0 10px 5px',
				},
			},
		},
	},
})

interface ISwitchOverlayLayersProps {
	query: string
	layerList: Layer<Source, LayerRenderer<any>>[]
}

export const SwitchOverlayLayers: React.FC<ISwitchOverlayLayersProps> = ({
	query,
	layerList,
}) => {
	const groupedLayerList: IMapLayersGroup[] = useMemo(() => {
		return groupedMapLayers(layerList)
	}, [layerList])

	return (
		<ThemeProvider theme={cmpTheme}>
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
		</ThemeProvider>
	)
}
