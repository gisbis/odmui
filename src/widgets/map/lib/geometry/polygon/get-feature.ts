import { getCoords } from './get-coords'

export const getFeature = (gml: any) => {
	try {
		const coords = []

		const exteriorPosList =
			gml?.['gml:exterior']?.['gml:LinearRing']?.['gml:posList']

		if (exteriorPosList) {
			try {
				const exteriorCoords = getCoords(exteriorPosList)
				coords.push(exteriorCoords)
			} catch (e) {
				console.log(e)
			}
		}

		const interiorPosList =
			gml?.['gml:interior']?.['gml:LinearRing']?.['gml:posList']

		if (interiorPosList) {
			try {
				const interiorCoords = getCoords(interiorPosList)
				coords.push(interiorCoords)
			} catch (e) {
				console.log(e)
			}
		}

		return {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: coords,
			},
		}
	} catch (e) {
		console.log(e)
	}
}
