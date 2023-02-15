import type { ILayer } from 'entities/user'

export const filterBaseLayers = (layerList: ILayer[]) => {
	return layerList.filter((i) => !!i.type && +i.type === 3)
}
