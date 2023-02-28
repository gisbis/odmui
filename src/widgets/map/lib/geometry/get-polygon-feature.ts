import { mapLib } from 'widgets/map/index'

export const getPolygonFeature = (gml: any) => {
	const coords = []

	const exteriorPosList =
		gml?.['gml:exterior']?.['gml:LinearRing']?.['gml:posList']

	if (exteriorPosList) {
		try {
			const exteriorCoords = mapLib.getPolygonCoords(exteriorPosList)
			coords.push(exteriorCoords)
		} catch (e) {
			console.log(e)
		}
	}

	const interiorPosList =
		gml?.['gml:interior']?.['gml:LinearRing']?.['gml:posList']

	if (interiorPosList) {
		try {
			const interiorCoords = mapLib.getPolygonCoords(interiorPosList)
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
}
