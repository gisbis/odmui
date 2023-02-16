import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'

import { useMapContext, mapLib, mapSelectors } from 'widgets/map'

import { FilterLayers } from '../filter-layers'
import { SwitchOverlayLayers } from '../switch-overlay-layers'
import { UncheckAll } from '../uncheck-all'

export const LayerSwitcherWrapper = () => {
	const { map } = useMapContext()

	const mapOnLoadEnd = useAppSelector(mapSelectors.selectMapOnLoadEnd)
	const activeIdLayerList = useAppSelector(mapSelectors.selectActiveIdLayerList)

	console.log({ mapOnLoadEnd })

	const [query, setQuery] = useState('')

	const overlayLayerList = useMemo(() => {
		if (!map) {
			return []
		}

		return mapLib.getMapOverlayLyers({ map }).filter((i) => !i.get('autoload'))
	}, [map])

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
