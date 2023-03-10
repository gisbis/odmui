import { getCoords } from './get-coords'

export const getFeature = (gml: any) => {
	try {
		const posList = gml?.['gml:pos']

		return {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: getCoords(posList),
			},
		}
	} catch (e) {
		console.log(e)
	}
}
