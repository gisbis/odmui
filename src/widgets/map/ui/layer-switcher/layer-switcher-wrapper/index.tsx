import { useMemo, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { useTranslate } from 'shared/i18n'
import { useMapContext, mapLib } from 'widgets/map'

import { SwitchBaseLayers } from '../switch-base-layers'
import { SwitchOverlayLayers } from '../switch-overlay-layers'
import { FilterLayers } from '../filter-layers'

export const LayerSwitcherWrapper = () => {
	const { translate } = useTranslate()
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
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box sx={{ p: 3, pt: '1rem' }}>
				<FilterLayers query={query} setQuery={setQuery} />
			</Box>

			<Stack spacing={2} sx={{ flexGrow: 1, overflowY: 'auto', px: 3, pb: 3 }}>
				<Box>
					<Typography variant="body2" color="text.secondary" mb={1.5}>
						{translate('Base layers')}
					</Typography>
					<SwitchBaseLayers layerList={filteredBaseLayerList} />
				</Box>

				<Box>
					<Typography variant="body2" color="text.secondary" mb={1.5}>
						{translate('Overlay layers')}
					</Typography>
					<SwitchOverlayLayers
						query={query}
						layerList={filteredOverlayLayerList}
					/>
				</Box>
			</Stack>
		</Box>
	)
}
