import { Layer } from 'ol/layer'
import { Source } from 'ol/source'
import LayerRenderer from 'ol/renderer/Layer'

import type { ILayer, ILayersGroup } from 'shared/api/user'

export interface IMapLayersGroup {
	idLayerGroup: string
	nameLayerGroup: string
	layers: Layer<Source, LayerRenderer<any>>[]
}

export const groupedLayers = (layerList: ILayer[]) => {
	return layerList.reduce((acc: ILayersGroup[], value) => {
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
}

export const groupedMapLayers = (
	layerList: Layer<Source, LayerRenderer<any>>[]
) => {
	return layerList.reduce((acc: IMapLayersGroup[], value) => {
		const { idLayerGroup, nameLayerGroup } = value.get('group')

		let groupIdx = acc.findIndex((i) => i.idLayerGroup === idLayerGroup)

		if (groupIdx === -1) {
			let group = {
				idLayerGroup,
				layers: [value],
				nameLayerGroup,
			}

			acc.push(group)
		} else {
			acc[groupIdx].layers.push(value)
		}

		return acc
	}, [] as IMapLayersGroup[])
}
