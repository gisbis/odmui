import { ILayer } from 'entities/select'

export const filterOverlayLayers = (layerList: ILayer[]) => {
	return layerList.filter((i) => !!i.type && +i.type !== 3)
}
