import { Coordinate } from 'ol/coordinate'
import { fromLonLat } from 'ol/proj'

export const getCoords = (posList: string) => {
	try {
		const parsedPosList = posList.split(' ')

		const coordsX: number[] = []
		const coordsY: number[] = []

		const coords: Coordinate[] = []

		for (let i = 0; i < parsedPosList.length; i++) {
			if (i % 2 === 0) {
				coordsX.push(+parsedPosList[i])
			} else {
				coordsY.push(+parsedPosList[i])
			}
		}

		for (let i = 0; i < coordsX.length; i++) {
			coords.push(fromLonLat([coordsY[i], coordsX[i]]))
		}

		return coords
	} catch (e) {
		return []
	}
}
