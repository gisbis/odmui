import { useEffect, useMemo, useState } from 'react'
import { Box, Stack } from '@mui/material'

import { useAppSelector } from 'shared/model'

import { useMapContext } from '../../context'
import { filterBaseLayers, filterOverlayLayers } from '../../lib'

import { FilterLayers } from './filter-layers'
import { SwitchBaseLayer } from './switch-base-layer'
import { SwitchOverlayLayers } from './switch-overlay-layers'
import { UncheckAll } from './uncheck-all'

export const LayerSwitcher = () => {
	const [query, setQuery] = useState('')

	const { map } = useMapContext()

	const layerList = useAppSelector((state) => state.select.layerList)

	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)

	useEffect(() => {
		if (!map) {
			return
		}

		map.getAllLayers().forEach(function (layer) {
			const type = layer.get('type')
			const idLayer = layer.get('idLayer')

			if (type === 'base') {
				return
			}

			const layerIsVisible = activeIdLayerList.map((i) => +i).includes(+idLayer)
			layer.setVisible(layerIsVisible)
		})
	}, [activeIdLayerList, map])

	const baseLayerList = useMemo(() => {
		return filterBaseLayers(layerList)
	}, [layerList])

	const overlayLayerList = useMemo(() => {
		return filterOverlayLayers(layerList)
	}, [layerList])

	const filteredOverlayLayerList = useMemo(() => {
		return overlayLayerList.filter((i) =>
			i.name.toLowerCase().includes(query.toLowerCase())
		)
	}, [overlayLayerList, query])

	return (
		<>
			<Box sx={{ px: 3, py: 1.5, mb: 1 }}>
				<FilterLayers query={query} setQuery={setQuery} />
			</Box>

			<Box sx={{ px: 3, flexGrow: 1, overflowY: 'auto' }}>
				<SwitchBaseLayer layerList={baseLayerList} />
				<SwitchOverlayLayers
					query={query}
					layerList={filteredOverlayLayerList}
				/>
			</Box>

			<Stack direction="row" sx={{ px: 3, py: 1.5 }}>
				<UncheckAll />
			</Stack>
		</>
	)
}
