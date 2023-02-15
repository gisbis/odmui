import { useEffect, useMemo, useState } from 'react'

import { useAppSelector } from 'shared/model'
import type { ILayer } from 'entities/user'

import { useMapContext } from '../../../context'
import { getMapActiveOverlayLayers, groupedLayers } from '../../../lib'
import { Stack } from '@mui/material'
import { SymbolsGroup } from 'widgets/map/ui/symbols/symbols-group'

export const SymbolsWrapper = () => {
	const { map } = useMapContext()
	const mapIsRendered = useAppSelector((state) => state.map.mapIsRendered)
	const currentZoom = useAppSelector((state) => state.map.currentZoom)
	const layerList = useAppSelector((state) => state.user.layerList)

	const [symbolLayers, setSymbolLayers] = useState<ILayer[]>([])

	useEffect(() => {
		if (!map || !currentZoom || !mapIsRendered) {
			setSymbolLayers([])
			return
		}

		const activeLayers = getMapActiveOverlayLayers({ map, zoom: currentZoom })

		const symbolLayers: ILayer[] = []

		layerList.forEach((layer) => {
			const isActiveLayer = !!activeLayers.find(
				(i) => String(i.get('idLayer')) === String(layer.id)
			)

			if (
				(isActiveLayer || layer.autoload) &&
				(+layer.type === 1 || +layer.type === 2) &&
				!layer.noLegend
			) {
				symbolLayers.push(layer)
			}
		})

		setSymbolLayers(symbolLayers)
	}, [map, mapIsRendered, currentZoom, layerList])

	const groupedSymbolLayers = useMemo(() => {
		return groupedLayers(symbolLayers)
	}, [symbolLayers])

	return (
		<Stack spacing={5} sx={{ p: 3 }}>
			{groupedSymbolLayers.map((group) => (
				<SymbolsGroup key={group.idLayerGroup} group={group} />
			))}
		</Stack>
	)
}
