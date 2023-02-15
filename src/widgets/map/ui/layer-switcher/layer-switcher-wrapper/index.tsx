import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'

import { useMapContext } from '../../../context'
import { getMapOverlayLyers } from '../../../lib'

import { FilterLayers } from '../filter-layers'
import { SwitchOverlayLayers } from '../switch-overlay-layers'
import { UncheckAll } from '../uncheck-all'

export const LayerSwitcherWrapper = () => {
	const { map } = useMapContext()

	const mapIsRendered = useAppSelector((state) => state.map.mapIsRendered)

	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)

	const [query, setQuery] = useState('')

	const overlayLayerList = useMemo(() => {
		if (!map || !mapIsRendered) {
			return []
		}

		return getMapOverlayLyers({ map }).filter((i) => !i.get('autoload'))
	}, [map, mapIsRendered])

	const filteredOverlayLayerList = useMemo(() => {
		return overlayLayerList.filter((i) =>
			i.get('title')?.toLowerCase()?.includes(query.toLowerCase())
		)
	}, [overlayLayerList, query])

	useEffect(() => {
		overlayLayerList.forEach(function (layer) {
			const idLayer = layer.get('idLayer')

			const layerIsVisible = activeIdLayerList.map((i) => +i).includes(+idLayer)

			layer.setVisible(layerIsVisible)
		})
	}, [activeIdLayerList, overlayLayerList])

	return (
		<>
			<Box sx={{ px: 3, pt: 3 }}>
				<FilterLayers query={query} setQuery={setQuery} />
			</Box>

			<Box sx={{ flexGrow: 1, overflowY: 'auto', px: 3, py: 3 }}>
				<SwitchOverlayLayers
					query={query}
					layerList={filteredOverlayLayerList}
				/>
			</Box>

			<Box sx={{ px: 3, pb: 3 }}>
				<UncheckAll />
			</Box>
		</>
	)
}
