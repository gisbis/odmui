import { fromLonLat } from 'ol/proj'

export const getCoords = (posList: string) => {
	try {
		const parsedPosList = posList.split(' ')

		const centerCoords = [+parsedPosList[1], +parsedPosList[0]]

		const coords = [
			fromLonLat([centerCoords[0] + 0.00002, centerCoords[1] + 0.00001]),
			fromLonLat([centerCoords[0] - 0.00002, centerCoords[1] + 0.00001]),
			fromLonLat([centerCoords[0] - 0.00002, centerCoords[1] - 0.00001]),
			fromLonLat([centerCoords[0] + 0.00002, centerCoords[1] - 0.00001]),
		]

		return [coords]
	} catch (e) {
		return []
	}
}
