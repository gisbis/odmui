import { useMemo } from 'react'
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material'

import { ILayer, mapLib } from 'entities/map'
import { LayerSwitcherGroup } from '../layer-switcher-group'

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
	layerList: ILayer[]
}
export const SwitchOverlayLayers: React.FC<ISwitchOverlayLayersProps> = ({
	query,
	layerList,
}) => {
	const groupedLayerList = useMemo(() => {
		return mapLib.groupedLayers(layerList)
	}, [layerList])

	return (
		<ThemeProvider theme={cmpTheme}>
			<Box>
				<Stack spacing={1}>
					{groupedLayerList.map((group) => (
						<LayerSwitcherGroup
							group={group}
							key={group.idLayerGroup}
							defaultGroupIsOpen={!!query}
						/>
					))}
				</Stack>
			</Box>
		</ThemeProvider>
	)
}
