import { useEffect, useMemo, useState } from 'react'
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	createTheme,
	Stack,
	ThemeProvider,
} from '@mui/material'

import { useMapContext, mapLib } from 'widgets/map'

import { SwitchBaseLayers } from '../switch-base-layers'
import { SwitchOverlayLayers } from '../switch-overlay-layers'
import { FilterLayers } from '../filter-layers'
import { UncheckAll } from '../uncheck-all'

const cmpTheme = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: '14px',
					borderColor: 'transparent',
				},
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					paddingBottom: 0,
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					'&:last-child': {
						paddingBottom: 15,
					},
				},
			},
		},
	},
})

export const LayerSwitcherWrapper = () => {
	const { map } = useMapContext()

	const [query, setQuery] = useState('')

	const overlayLayerList = useMemo(() => {
		if (!map) {
			return []
		}

		return mapLib.getMapOverlayLyers({ map }).filter((i) => !i.get('autoload'))
	}, [map])

	const baseLayerList = useMemo(() => {
		if (!map) {
			return []
		}

		return mapLib.getMapBaseLayers({ map }).filter((i) => !i.get('autoload'))
	}, [map])

	const filteredOverlayLayerList = useMemo(() => {
		return overlayLayerList.filter((i) =>
			i.get('title')?.toLowerCase()?.includes(query.toLowerCase())
		)
	}, [overlayLayerList, query])

	const filteredBaseLayerList = useMemo(() => {
		return baseLayerList.filter((i) =>
			i.get('title')?.toLowerCase()?.includes(query.toLowerCase())
		)
	}, [baseLayerList, query])

	return (
		<>
			<ThemeProvider theme={cmpTheme}>
				<Box sx={{ px: 3, py: 1.5 }}>
					<Card variant="outlined">
						<CardContent sx={{ py: 0, '&:last-child': { pb: 0 } }}>
							<FilterLayers query={query} setQuery={setQuery} />
						</CardContent>
					</Card>
				</Box>

				<Stack spacing={1.5} sx={{ flexGrow: 1, overflowY: 'auto', px: 3 }}>
					<Card variant="outlined">
						<CardHeader subheader="Подложка" />
						<CardContent>
							<SwitchBaseLayers layerList={filteredBaseLayerList} />
						</CardContent>
					</Card>

					<Card variant="outlined">
						<CardHeader subheader="Слои" action={<UncheckAll />} />

						<CardContent>
							<SwitchOverlayLayers
								query={query}
								layerList={filteredOverlayLayerList}
							/>
						</CardContent>
					</Card>
				</Stack>
			</ThemeProvider>
		</>
	)
}
