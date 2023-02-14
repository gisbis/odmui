import { useMemo } from 'react'
import {
	Box,
	createTheme,
	Stack,
	ThemeProvider,
	Typography,
} from '@mui/material'

import { LayerSwitcherGroup } from '../layer-switcher-group'
import { groupedLayers } from '../../../../../lib'

import { ILayer } from 'entities/select'

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
		return groupedLayers(layerList)
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
