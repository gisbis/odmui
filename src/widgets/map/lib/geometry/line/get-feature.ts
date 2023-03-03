import { getCoords } from './get-coords'

export const getFeature = (gml: any) => {
	try {
		const posList = gml?.['gml:posList']

		return {
			type: 'Feature',
			geometry: {
				type: 'LineString',
				coordinates: getCoords(posList),
			},
		}
	} catch (e) {
		console.log(e)
	}
}
