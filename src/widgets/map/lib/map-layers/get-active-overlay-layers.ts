import type { Map } from 'ol'

export const getActiveOverlayLayers = (params: {
	map: Map
	zoom: number | undefined
}) => {
	const { map, zoom } = params
	if (!zoom) {
		return []
	}

	let filteredLayers = map
		.getAllLayers()
		.filter((i) => i.getVisible() && i.get('type').toLowerCase() !== 'base')

	filteredLayers = filteredLayers.filter(
		(i) => !i.getMaxZoom() || i.getMaxZoom() > zoom
	)
	filteredLayers = filteredLayers.filter(
		(i) => !i.getMinZoom() || i.getMinZoom() < zoom
	)

	return filteredLayers
}
