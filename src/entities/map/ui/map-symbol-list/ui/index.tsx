import { useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'

import { useAppSelector } from 'shared/model'
import { useMapContext } from 'entities/map'
import { ILayer } from 'entities/map'
import { mapLib } from 'entities/map'

import { LayerGroupSymbolList } from './LayerGroupSymbolList'
import '../index.scss'

export interface ILayersGroup {
	idLayerGroup: string
	nameLayerGroup: string
	layers: ILayer[]
}

export const MapSymbolList = () => {
	const { map } = useMapContext()
	const [symbolLayerList, setSymbolLayerList] = useState<ILayer[]>([])

	const layerList = useAppSelector((state) => state.map.layerList)
	const currentZoom = useAppSelector((state) => state.map.currentZoom)

	useEffect(() => {
		if (!map || !currentZoom) {
			return
		}

		updateSymbolList()
	}, [map, currentZoom])

	const groupSymbolLayerList: ILayersGroup[] = useMemo(() => {
		console.log('memo')
		return symbolLayerList.reduce((acc: ILayersGroup[], value) => {
			const { idLayerGroup, nameLayerGroup } = value.LayerGroup

			let groupIdx = acc.findIndex((i) => i.idLayerGroup === idLayerGroup)

			if (groupIdx === -1) {
				let group = {
					idLayerGroup,
					layers: [value],
					nameLayerGroup,
				} as ILayersGroup

				acc.push(group)
			} else {
				acc[groupIdx].layers.push(value)
			}

			return acc
		}, [] as ILayersGroup[])
	}, [symbolLayerList])

	const updateSymbolList = () => {
		if (!map || !currentZoom) {
			return
		}

		const activeLyrs = mapLib.getActiveOverlayLayers({ map, zoom: currentZoom })

		const symbolLayerList: ILayer[] = []

		layerList.forEach((layer) => {
			const layerInActiveMapLayers = !!activeLyrs.find(
				(i) => String(i.get('idLayer')) === String(layer.id)
			)

			if (
				(layerInActiveMapLayers || layer.autoload) &&
				(+layer.type === 1 || +layer.type === 2) &&
				!layer.noLegend
			) {
				symbolLayerList.push(layer)
			}
		})

		setSymbolLayerList(symbolLayerList)
	}

	return (
		<Box
			sx={{
				height: '100%',
				overflowY: 'auto',
			}}
		>
			<Box sx={{ p: 3, display: 'flex', flexDirection: 'column', rowGap: 5 }}>
				{groupSymbolLayerList.map((group) => (
					<LayerGroupSymbolList group={group} key={group.idLayerGroup} />
				))}
			</Box>
		</Box>
	)
}
