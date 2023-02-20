import { useEffect, useMemo, useState } from 'react'
import { Stack } from '@mui/material'

import type { ILayer } from 'shared/api/user'
import { useAppSelector } from 'shared/model'

import { useMapContext, mapLib } from 'widgets/map'

import { SymbolsGroup } from '../symbols-group'

export const SymbolsWrapper = () => {
	const { map } = useMapContext()

	const currentZoom = useAppSelector((state) => state.map.currentZoom)
	const layerList = useAppSelector((state) => state.user.layerList)

	const [symbolLayers, setSymbolLayers] = useState<ILayer[]>([])

	useEffect(() => {
		if (!map || !currentZoom) {
			return
		}

		setTimeout(() => {
			const activeLayers = mapLib.getMapActiveOverlayLayers({
				map,
				zoom: currentZoom,
			})

			const symbolLayers: ILayer[] = []

			layerList.forEach((layer) => {
				const layerIsActiveOnMap = !!activeLayers.find(
					(i) => String(i.get('idLayer')) === String(layer.id)
				)

				if (layerIsActiveOnMap && !layer.noLegend) {
					symbolLayers.push(layer)
				}
			})

			setSymbolLayers(symbolLayers)
		}, 0)
	}, [map, currentZoom, layerList])

	const groupedSymbolLayers = useMemo(() => {
		return mapLib.groupedLayers(symbolLayers)
	}, [symbolLayers])

	return (
		<Stack spacing={5} sx={{ p: 3 }}>
			{groupedSymbolLayers.map((group) => (
				<SymbolsGroup key={group.idLayerGroup} group={group} />
			))}
		</Stack>
	)
}
