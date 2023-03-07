import type { ILayer } from 'shared/api/user'

export const filterBaseLayers = (layerList: ILayer[]) => {
	return layerList.filter((i) => !!i.type && +i.type === 3 && !!i.isHistorical)
}
