import { Coordinate } from 'ol/coordinate'
import { fromLonLat } from 'ol/proj'

export const getCoords = (posList: string) => {
	try {
		const parsedPosList = posList.split(' ')

		const coords: Coordinate = fromLonLat([
			+parsedPosList[1],
			+parsedPosList[0],
		])

		return coords
	} catch (e) {
		return []
	}
}
