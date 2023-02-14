import { ILayer, ILayersGroup } from 'entities/select'

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
