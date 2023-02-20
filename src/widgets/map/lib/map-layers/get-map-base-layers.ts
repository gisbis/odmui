import { Map } from 'ol'

export const getMapBaseLayers = (params: { map: Map }) => {
	return params.map
		.getAllLayers()
		.filter((i) => i.get('type')?.toLowerCase() === 'base')
}
