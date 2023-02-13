import { ILayer } from 'entities/map/model'

export const filterOverlayLayers = (layerList: ILayer[]) => {
	return layerList.filter((i) => !!i.type && +i.type !== 3)
}
