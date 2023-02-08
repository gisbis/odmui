import { OLGeometry } from 'shared/model'
import { getArea, getLength } from 'ol/sphere'

export const formatLength = (line: OLGeometry) => {
	const length = getLength(line)
	let output
	if (length > 100) {
		output = Math.round((length / 1000) * 100) / 100 + ' km'
	} else {
		output = Math.round(length * 100) / 100 + ' m'
	}
	return output
}

export const formatArea = (polygon: OLGeometry) => {
	const area = getArea(polygon)
	let output
	if (area > 10000) {
		output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2'
	} else {
		output = Math.round(area * 100) / 100 + ' m\xB2'
	}
	return output
}
