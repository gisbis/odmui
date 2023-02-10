import { Geometry } from 'ol/geom'
import { getArea } from 'ol/sphere'

export const formatArea = (geometry: Geometry) => {
	const area = getArea(geometry)
	let output
	if (area > 10000) {
		output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2'
	} else {
		output = Math.round(area * 100) / 100 + ' m\xB2'
	}
	return output
}
