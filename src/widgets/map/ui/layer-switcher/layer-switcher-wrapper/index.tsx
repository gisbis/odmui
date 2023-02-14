import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'

import { useMapContext } from '../../../context'

import { FilterLayers } from '../filter-layers'
import { SwitchOverlayLayers } from '../switch-overlay-layers'
import { UncheckAll } from '../uncheck-all'

import LayerRenderer from 'ol/renderer/Layer'
import type { Layer } from 'ol/layer'
import type { Source } from 'ol/source'

export const LayerSwitcherWrapper = () => {
	const [query, setQuery] = useState('')
	const [layerList, setLayerList] = useState<
		Layer<Source, LayerRenderer<any>>[]
	>([])

	const { map } = useMapContext()

	const activeIdLayerList = useAppSelector(
		(state) => state.map.activeIdLayerList
	)

	useEffect(() => {
		if (!map) {
			return
		}

		map.on('rendercomplete', () => {
			const layers = map
				.getAllLayers()
				.filter(
					(i) => !i.get('autoload') && i.get('type').toLowerCase() === 'overlay'
				)
			setLayerList(layers)
		})
	}, [map])

	useEffect(() => {
		layerList.forEach(function (layer) {
			const idLayer = layer.get('idLayer')

			const layerIsVisible = activeIdLayerList.map((i) => +i).includes(+idLayer)

			layer.setVisible(layerIsVisible)
		})
	}, [activeIdLayerList, layerList])

	const baseLayerList = useMemo(() => {
		return layerList.filter((i) => i.get('type').toLowerCase() === 'base')
	}, [layerList])

	const overlayLayerList = useMemo(() => {
		return layerList.filter((i) => i.get('type').toLowerCase() === 'overlay')
	}, [layerList])

	const filteredOverlayLayerList = useMemo(() => {
		return overlayLayerList.filter((i) =>
			i.get('title').toLowerCase().includes(query.toLowerCase())
		)
	}, [overlayLayerList, query])

	console.log('layerList', { layerList })

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
