import { Geometry } from 'ol/geom'
import { getLength } from 'ol/sphere'

export const formatLength = (geometry: Geometry) => {
	const length = getLength(geometry)
	let output
	if (length > 100) {
		output = Math.round((length / 1000) * 100) / 100 + ' km'
	} else {
		output = Math.round(length * 100) / 100 + ' m'
	}
	return output
}
