import type { ILayer } from 'entities/user'

export const filterOverlayLayers = (layerList: ILayer[]) => {
	return layerList.filter((i) => !!i.type && +i.type !== 3)
}
