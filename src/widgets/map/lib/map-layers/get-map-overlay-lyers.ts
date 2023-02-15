import { Map } from 'ol'

export const getMapOverlayLyers = (params: { map: Map }) => {
	return params.map
		.getAllLayers()
		.filter((i) => i.get('type')?.toLowerCase() === 'overlay')
}
